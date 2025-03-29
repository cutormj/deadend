'use client';

import React, { useEffect, useState } from 'react';

const DisplayDataPage: React.FC = () => {
  const [data, setData] = useState<null | Array<Record<string, string | number | boolean>>>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetch-data'); // Fetch data from your API route
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data); // Set the fetched data
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-white p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white p-4 text-red-500">Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="min-h-screen bg-white p-4">No data found in the database.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Browser Information from MongoDB</h1>
      <ul className="list-disc pl-5">
        {data.map((entry, index) => (
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

export default DisplayDataPage;