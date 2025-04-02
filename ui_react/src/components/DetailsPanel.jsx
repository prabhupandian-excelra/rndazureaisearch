import React from 'react';

function DetailsPanel({ data }) {
  return (
    <div style={{ width: '40%', border: '1px solid #ccc', padding: '10px' }}>
      <h2>Details</h2>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Count:</strong> {data.count}
      </p>
      <p>
        <strong>Snippet:</strong>
      </p>
      <pre>{data.snippet}</pre>
    </div>
  );
}

export default DetailsPanel;
