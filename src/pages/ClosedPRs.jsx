import PrList from "../components/prComponents/PrList";
import { Link } from "react-router-dom";

function ClosedPRs() {
  return (
    <section className="flex items-center justify-center">
      <div className="main-content flex flex-col items-center bg-gray-100">
        <h2 className="main-h2 mb-4">Closed Pull Requests</h2>

        <PrList filterState="closed" />

        <Link 
          to="/pr-List/closed"
          className=" px-6 py-2  bg-[#60B8DE] text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
        >
          More
        </Link>
      </div>
    </section>
  )
}

export default ClosedPRs;