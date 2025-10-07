import { useState } from "react";
import PrList from "../components/prComponents/PrList";
import { Link } from "react-router-dom";
import { downloadJSON } from "../utils/downloadJSON";


function ClosedPRs({state="closed"}) {
  const [prData, setPrData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDataFetched = (data) => {
    setPrData(data);
  };

  const handleDownload = () => {
    downloadJSON(prData, 'closed-prs');
  };

  //to clear the search input
  const handleClear = () => {
    setSearchTerm("");
  }

  return (
    <section className="flex items-center justify-center" aria-labelledby="closed-prs-heading">
      <div className="main-content flex flex-col items-center">
        <h2 id="closed-prs-heading" className="main-h2 mb-4">Closed Pull Requests</h2>

        <div className="w-full max-w-md mb-4 relative">

          {/* 1. Visually Hidden Label */}
          <label htmlFor="pr-search" className="sr-only">
            Search Pull Requests
          </label>

          {/* 2. Input Description (aria-describedby target */}
          <p id="search-desc" className="sr-only">
            Search by contributor's name, pull request title, or description.
          </p>

          <input
            type="text"
            placeholder="🔎 Contributor's name, pull request title & description..."
            id="pr-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60B8DE]"
            aria-describedby="search-desc"
          />
          {searchTerm && <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1" onClick={handleClear}>&#x2715;</button>}
          
        </div>

<PrList 
  state={state} 
  onDataFetched={handleDataFetched}
  search={searchTerm}
/>

        {prData && (
          <button 
          onClick={handleDownload}
          className="mb-4 mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
        >
          Save JSON for Testing 
        </button>
        )}

      </div>
    </section>
  );
}

export default ClosedPRs;
