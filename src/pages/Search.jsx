import React, { useState } from 'react';

export default function SearchQueryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Example API endpoint (Replace with your own)
    const apiEndpoint = `https://api.example.com/search?query=${query}`;
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setResults(data.results || []); // Assuming the API returns results in `data.results`
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Search Query Page</h1>
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow py-2 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="mt-6">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div>
              {results.length > 0 ? (
                <ul className="space-y-4">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-md hover:shadow-md transition duration-300"
                    >
                      <h3 className="font-semibold text-lg">{result.title}</h3>
                      <p className="text-gray-600">{result.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No results found. Try another query!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
