
import React, { useState } from 'react';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiType, setApiType] = useState('tsunami');  // Default API selected

  const API_KEY = '446d183e64e64e8eb4bca1407ab02a89';  // Your provided API Key

  const apiUrls = {
    tsunami: 'https://gemini.incois.gov.in/incoisapi/rest/tsunami',
    stormSurgeLatest: 'https://gemini.incois.gov.in/incoisapi/rest/stormsurgelatest',
    highWaveAlerts: 'https://gemini.incois.gov.in/incoisapi/rest/hwalatestgeo',
    swellSurgeAlerts: 'https://gemini.incois.gov.in/incoisapi/rest/ssalatestgeo',
    coastalCurrentAlerts: 'https://gemini.incois.gov.in/incoisapi/rest/currentslatestgeo',
  };

  const fetchAPIData = async () => {
    setLoading(true);
    const url = apiUrls[apiType];

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': API_KEY,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setResponseData(data);
      } else {
        console.log('Failed to fetch: ' + response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>INCOIS API Test</h1>
      <div>
        <label>Select API: </label>
        <select value={apiType} onChange={(e) => setApiType(e.target.value)}>
          <option value="tsunami">Tsunami Alerts</option>
          <option value="stormSurgeLatest">Storm Surge Latest</option>
          <option value="highWaveAlerts">High Wave Alerts</option>
          <option value="swellSurgeAlerts">Swell Surge Alerts</option>
          <option value="coastalCurrentAlerts">Coastal Current Alerts</option>
        </select>
        <button onClick={fetchAPIData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {responseData ? (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        ) : (
          <p>No data fetched yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
