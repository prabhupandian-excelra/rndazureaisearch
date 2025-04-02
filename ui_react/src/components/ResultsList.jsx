import React from 'react';

function ResultsList({ results, onSelect }) {
  return (
    <div style={{ flex: 1, marginRight: '20px' }}>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results to display.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onSelect(item)}
              style={{
                cursor: 'pointer',
                padding: '10px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <strong>{item.name}</strong>
              <br />
              Count: {item.count}
              <br />
              Snippet: {item.snippet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultsList;
