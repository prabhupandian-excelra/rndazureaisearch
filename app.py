from flask import Flask, request, render_template, jsonify
import requests
import fitz  # PyMuPDF
import io
import os

app = Flask(__name__)






SEARCH_ENDPOINT = os.getenv("SEARCH_ENDPOINT")
INDEX_NAME = os.getenv("INDEX_NAME")
API_VERSION = os.getenv("API_VERSION", "2023-07-01-Preview")
API_KEY = os.getenv("API_KEY")
CONTAINER_NAME = os.getenv("CONTAINER_NAME", "rndaicontainer")
SAS_TOKEN = os.getenv("SAS_TOKEN")




def search_azure_ai(query):
    url = f"{SEARCH_ENDPOINT}/indexes/{INDEX_NAME}/docs/search?api-version={API_VERSION}"
    headers = {
        "Content-Type": "application/json",
        "api-key": API_KEY
    }

    is_filename = query.lower().endswith(".pdf")
    body = {
        "search": "*" if is_filename else query,
        "top": 10,
        "select": "metadata_storage_name,content",
        "filter": f"metadata_storage_name eq '{query}'" if is_filename else None
    }

    res = requests.post(url, headers=headers, json={k: v for k, v in body.items() if v is not None})
    results = res.json().get("value", [])

    ranked = []
    for item in results:
        name = item.get("metadata_storage_name", "Unknown")
        content = item.get("content", "")
        count = content.lower().count(query.lower()) if not is_filename else 0
        snippet = content[:500] + "..." if is_filename else ""
        ranked.append({"name": name, "count": count, "snippet": snippet})

    if not is_filename:
        ranked.sort(key=lambda x: x["count"], reverse=True)
    return ranked


@app.route("/", methods=["GET", "POST"])
def search():
    results = []
    query = ""
    if request.method == "POST":
        query = request.form.get("query")
        results = search_azure_ai(query)
    return render_template("search.html", results=results, query=query)


@app.route("/suggest")
def suggest():
    query = request.args.get("q", "")
    if not query:
        return jsonify([])

    try:
        results = search_azure_ai(query)
        suggestions = [
            {"file": r["name"], "count": r["count"]}
            for r in results if r["count"] > 0
        ]
        return jsonify(suggestions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/preview/<filename>")
def preview_pdf(filename):
    print("📥 Received preview request for:", filename)

    sas_url = f"https://rndaisearchstorage.blob.core.windows.net/{CONTAINER_NAME}/{filename}?{SAS_TOKEN}"
    print("🔗 SAS URL:", sas_url)

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
                if len(lines) >= 5:
                    break
            if len(lines) >= 5:
                break

        return jsonify({"filename": filename, "preview": lines})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health")
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(debug=False)
