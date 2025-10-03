import { useState } from "react";
import PrList from "../components/prComponents/PrList";
import { Link } from "react-router-dom";
import { downloadJSON } from "../utils/downloadJSON";


function OpenPRs({state="open"}) {
  const [prData, setPrData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDataFetched = (data) => {
    setPrData(data);
  };

  const handleDownload = () => {
    downloadJSON(prData, 'open-prs');
  };

  return (
    <section className="flex items-center justify-center" aria-labelledby="open-prs-heading">
      <div className="main-content open-cards">
        <h2 id="open-prs-heading" className="main-h2 mb-4">Open Pull Requests</h2>

        <div className="w-full max-w-md mb-4">

          {/* 1. Visually Hidden Label */}
          <label htmlFor="pr-search-open" className="sr-only">
            Search Open Pull Requests
          </label>

          {/* 2. Input Description (aria-describedby target) */}
          <p id="search-desc-open" className="sr-only">
            Search by contributor's name, pull request title, or description.
          </p>

          <input
            type="text"
            placeholder="🔎 Contributor's name, pull request title & description..." // Full descriptive placeholder
            id="pr-search-open" // Unique ID
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60B8DE]"
            aria-describedby="search-desc-open"
          />
        </div>
{/* Replace search="" with search={searchTerm}: */}
<PrList 
  state={state} 
  onDataFetched={handleDataFetched} 
  search={searchTerm}
/>

        {prData && (
          <button 
          onClick={handleDownload}
          className="mb-4 mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
          aria-label="Download open pull requests data as JSON file"
        >
          Save JSON for Testing 
        </button>
        )}

      </div>
    </section>
  );
}

export default OpenPRs;
