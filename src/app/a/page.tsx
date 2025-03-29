'use client';

import React, { useEffect, useState } from 'react';

const DisplayBrowserInfoPage: React.FC = () => {
  const [browserData, setBrowserData] = useState<null | Array<Record<string, string | number | boolean>>>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBrowserData = async () => {
      try {
        const response = await fetch('/api/get-browser-info'); // Fetch data from the API
        if (!response.ok) {
          throw new Error(`Failed to fetch browser-info.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBrowserData(data); // Set the fetched data
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred while fetching the browser data');
        }
        console.error('Error fetching browser-info.json:', err);
      }
    };

    fetchBrowserData();
  }, []);

  if (error) {
    return <div className="min-h-screen bg-white p-4 text-red-500">Error: {error}</div>;
  }

  if (!browserData) {
    return <div className="min-h-screen bg-white p-4">Loading browser data...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Browser Information</h1>
      <ul className="list-disc pl-5">
        {browserData.map((entry, index) => (
          <li key={index} className="mb-2">
            <strong>Entry {index + 1}:</strong>
            <ul className="list-inside list-disc pl-5">
              {Object.entries(entry).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayBrowserInfoPage;