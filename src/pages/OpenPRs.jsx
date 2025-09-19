import { useState } from "react";
import PrList from "../components/prComponents/PrList";
import { Link } from "react-router-dom";
import { downloadJSON } from "../utiils/downloadJSON.js";


function OpenPRs({state="open"}) {
  const [prData, setPrData] = useState(null);

  const handleDataFetched = (data) => {
    setPrData(data);
  };

  const handleDownload = () => {
    downloadJSON(prData, 'open-prs');
  };

  return (
    <section className="flex items-center justify-center">
      <div className="main-content flex flex-col items-center bg-gray-100">
        <h2 className="main-h2 mb-4">Open Pull Requests</h2>

<PrList 
state={state} 
showDownloadButton={true}
onDataFetched={handleDataFetched} 
/>

        {prData && (
          <button 
          onClick={handleDownload}
          className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
        >
          Save JSON for Testing 
        </button>
        )}

        <Link 
          to="/pr-list/open"
          className=" px-6 py-2  bg-[#60B8DE] text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          More
        </Link>
      </div>
    </section>
  );
}

export default OpenPRs;
