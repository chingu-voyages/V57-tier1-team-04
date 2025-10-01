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
          <input
            type="text"
            placeholder="Search pull requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search open pull requests by title, author, or description"
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
