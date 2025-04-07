import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Detection.css';

const Detection = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'AIzaSyBkbNVU4GwPvEpDBn1z8gui2I7KLa90JVk';
  const body = {
    "client": {
      "clientId": "Link security scanner",
      "clientVersion": "1.0"
    },
    "threatInfo": {
      "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      "platformTypes": ["ANY_PLATFORM"],
      "threatEntryTypes": ["URL"],
      "threatEntries": [
        {"url": url}
      ]
    }
  };

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
        body
      );
      setData(response.data);
    } catch (err) {
      setError('An error occurred while checking the URL');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detection-container">
      <h1>URL Detection</h1>
      <div className="url-input-container">
        <input
          type="text"
          className="url-input"
          placeholder="Enter URL to check"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check URL'}
        </button>
      </div>

      {error && (
        <div className="result-container">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {data && Object.keys(data).length > 0 && (
        <div className="result-container">
          <h2>Results</h2>
          <div className="result-item">
            <pre style={{ color: 'red', fontSize: 25}}>{JSON.stringify(data.matches[0].threatType, null, 2)}</pre>
            <pre style={{ color: 'red', fontSize: 25}}>Proceed with caution</pre>
          </div>
        </div>
      )}
      {data && Object.keys(data).length === 0 && (
        <div className="result-container">
          <h2>Results</h2>
          <div className="result-item">
            <pre style={{ color: 'green' }}>Safe URL you can proceed</pre>
          </div>
        </div>
      )}

    </div>
  );
};

export default Detection;