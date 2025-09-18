import PRDashboard from "../components/prComponents/PrList";
import { Link } from "react-router-dom";


function OpenPRs({filterState="open"}) {

  return (
    <section className="flex items-center justify-center">
      <div className="main-content flex flex-col items-center bg-gray-100">
        <h2 className="main-h2 mb-4">Open Pull Requests</h2>

        <PRDashboard filterState={filterState} />

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
