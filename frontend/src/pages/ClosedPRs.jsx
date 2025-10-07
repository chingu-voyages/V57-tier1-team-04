import { useState } from "react";
import PrList from "../components/prComponents/PrList";
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

  return (
    <section className="flex items-center justify-center">
      <div className="main-content flex flex-col items-center">
        <h2 className="main-h2 mb-4">Closed Pull Requests</h2>

        <div className="w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="🔎 Contributor's name, pull request title & description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
