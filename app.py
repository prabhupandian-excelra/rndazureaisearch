import os
from flask import Flask, request, jsonify, send_from_directory
import requests
import fitz  # PyMuPDF
import io
from flask_cors import CORS

# Initialize Flask app
# If your React build is in a subfolder (e.g., ui_react/build), change static_folder accordingly.
app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

# Retrieve configuration from environment variables.
SEARCH_ENDPOINT = os.getenv("SEARCH_ENDPOINT")
INDEX_NAME = os.getenv("INDEX_NAME")
API_VERSION = os.getenv("API_VERSION", "2023-07-01-Preview")
API_KEY = os.getenv("API_KEY")
CONTAINER_NAME = os.getenv("CONTAINER_NAME", "rndaicontainer")
SAS_TOKEN = os.getenv("SAS_TOKEN")

def search_azure_ai(query):
    print("🔍 Searching Azure for:", query)
    url = f"{SEARCH_ENDPOINT}/indexes/{INDEX_NAME}/docs/search?api-version={API_VERSION}"
    headers = {
        "Content-Type": "application/json",
        "api-key": API_KEY
    }
    is_filename = query.lower().endswith(".pdf")
    body = {
        "search": "*",  # Wildcard search; adjust if needed.
        "top": 20,
        "select": "metadata_storage_name,content",
    }
    res = requests.post(url, headers=headers, json={k: v for k, v in body.items() if v is not None})
    results = res.json().get("value", [])
    ranked = []
    if is_filename:
        print(f"⚠️ Filtering manually for filename match: {query}")
    for item in results:
        name = item.get("metadata_storage_name", "Unknown")
        content = item.get("content", "")
        if is_filename and name.lower() != query.lower():
            continue
        count = content.lower().count(query.lower()) if not is_filename else 0
        snippet_lines = []
        paragraphs = content.split('\n\n')
        for para in paragraphs:
            lines = [line.strip() for line in para.strip().splitlines() if line.strip()]
            snippet_lines.extend(lines)
            if len(snippet_lines) >= 6:
                break
        snippet = "\n".join(snippet_lines[:6]) if snippet_lines else "No preview available."
        ranked.append({"name": name, "count": count, "snippet": snippet})
    if not is_filename:
        ranked.sort(key=lambda x: x["count"], reverse=True)
    return ranked

# Serve the React app's index.html for the root URL.
@app.route('/', methods=['GET'])
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint for search, used by the React frontend.
@app.route('/api/search', methods=['POST'])
def api_search():
    data = request.get_json() or {}
    query = data.get("query", "")
    results = []
    selected = {}
    if query:
        ranked = search_azure_ai(query)
        if ranked:
            if query.lower().endswith(".pdf"):
                selected = next((r for r in ranked if r["name"].lower() == query.lower()), {})
                results = [r for r in ranked if r["name"].lower() != query.lower()]
                additional_results = search_azure_ai(selected.get("snippet", "")) if selected else []
                results += [r for r in additional_results
                            if r["name"].lower() != selected.get("name", "").lower() and r not in results]
            else:
                selected = ranked[0]
                results = ranked[1:]
    return jsonify({"results": results, "selected": selected})

@app.route("/suggest")
def suggest():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])
    try:
        results = search_azure_ai(query)
        suggestions = [{"file": r["name"], "count": r["count"]} for r in results if r["count"] > 0]
        return jsonify(suggestions)
    except Exception as e:
        print("❌ Error in /suggest:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/preview/<filename>")
def preview_pdf(filename):
    sas_url = f"https://rndaisearchstorage.blob.core.windows.net/{CONTAINER_NAME}/{filename}?{SAS_TOKEN}"
    try:
        res = requests.get(sas_url)
        res.raise_for_status()
        pdf_bytes = io.BytesIO(res.content)
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        lines = []
        for page in doc:
            text = page.get_text()
            for line in text.strip().splitlines():
                if line.strip():
                    lines.append(line.strip())
                if len(lines) >= 10:
                    break
            if len(lines) >= 10:
                break
        return jsonify({"filename": filename, "preview": lines})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/file-details/<filename>")
def file_details(filename):
    return jsonify({
        "Filename": filename,
        "Author": "Unknown",
        "Journal": "Auto-detected",
        "Mentions": "To be calculated",
        "Size": "N/A"
    })

@app.route("/health")
def health():
    return "OK", 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
