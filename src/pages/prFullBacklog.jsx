import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import PrList from "../components/prComponents/PrList";

function PRListPage() {
  const navigate = useNavigate();
  const { filter } = useParams();
  const [search, setSearch] = useState("");

  return (
    <section className="flex items-center justify-center ">
      <div className="main-content flex flex-col gap-4 bg-gray-100">
        <button
          onClick={() => navigate("/")}
          className="self-start px-4 py-2 bg-gray-700 text-gray-100 rounded-lg text-sm hover:bg-gray-900 transition"
        >
          ← Back to Home
        </button>

        <input
          type="text"
          placeholder="Search pull requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60B8DE] outline-none"
        />

        <PrList filterState={filter} search={search} />
      </div>
    </section>
  );
}

export default PRListPage;
