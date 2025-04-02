import React, { useState, useEffect } from 'react';

function SearchBar({ setResults }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions as the user types
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`/suggest?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Handle form submission for search
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      // Combine the selected item (if any) and the rest of the results
      const combined = [];
      if (data.selected && Object.keys(data.selected).length > 0) {
        combined.push(data.selected);
      }
      if (data.results && data.results.length > 0) {
        combined.push(...data.results);
      }
      setResults(combined);
    } catch (error) {
      console.error('Search error:', error);
    }
    setSuggestions([]);
  };

  // Optionally handle suggestion clicks to trigger a search
  const handleSuggestionClick = async (sug) => {
    setQuery(sug.file); // assuming your suggestion object uses "file" as the key
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sug.file }),
      });
      const data = await response.json();
      const combined = [];
      if (data.selected && Object.keys(data.selected).length > 0) {
        combined.push(data.selected);
      }
      if (data.results && data.results.length > 0) {
        combined.push(...data.results);
      }
      setResults(combined);
    } catch (error) {
      console.error('Search error:', error);
    }
    setSuggestions([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a disease term or PDF file..."
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '5px' }}>
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul
          style={{
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: '0',
            width: '300px',
          }}
        >
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              style={{
                cursor: 'pointer',
                padding: '5px',
                borderBottom: '1px solid #eee',
              }}
              onClick={() => handleSuggestionClick(sug)}
            >
              {sug.file} ({sug.count})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
