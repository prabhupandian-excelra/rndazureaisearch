// File: src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import DetailsPanel from './components/DetailsPanel';

function App() {
  // Global state: search results and the selected result.
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Azure AI Search: How Can I help you?</h1>
      <SearchBar setResults={setResults} />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <ResultsList results={results} onSelect={setSelected} />
        {selected && <DetailsPanel data={selected} />}
      </div>
    </div>
  );
}

export default App;
