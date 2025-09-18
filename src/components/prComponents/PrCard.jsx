import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import { IoMdStopwatch, IoIosGitMerge } from "react-icons/io";
import { RiGitClosePullRequestFill } from "react-icons/ri";
import { LuGitPullRequestArrow } from "react-icons/lu";
import { MdComment } from "react-icons/md";

const PROverviewCard = ({ pr }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6  w-full md:w-[650px] hover:shadow-xl transition-shadow flex flex-col gap-4">
      <div className="flex justify-between items-start ">
        <div className="flex items-center gap-2 pr-8">
          {pr.state==="open"? <LuGitPullRequestArrow />: pr.state==="Closed"? <RiGitClosePullRequestFill/>:<IoIosGitMerge />}
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm  ${
              pr.state === "open" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
            }`}
          >
            {pr.state === "open" ? "OPEN" : pr.state.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-500 text-lg">
            {pr.state === "open" ? <IoMdStopwatch className="text-black"/> : pr.state === "closed" ? <FaXmark className="text-red-500"/> : <TiTick className="text-green-500"/>}
          </span>
          <span className="text-gray-600 text-sm font-medium">
            {pr.state === "open"
              ? "Pending"
              : pr.state === "closed"
              ? "Closed"
              : "Merged"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-black font-semibold text-lg">{pr.title}</h3>
        <p className="text-gray-500 text-sm">{pr.body || "No description provided"}</p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <img
            src={pr.user.avatar_url}
            alt={pr.user.login}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-800 font-medium">{pr.user.login}</span>
        </div>
        <div className="text-gray-500 text-xs">{pr.timeAgo || "2h ago"}</div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">#{pr.number}</span>

          {pr.comments && (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <span className="flex items-center justify-center gap-1 text-sm font-medium"><MdComment />{pr.comments}</span>
            </div>
          )}
        </div>

        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#60B8DE] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {pr.state === "open" ? "Review" : "View PR"}
        </a>
      </div>
    </div>
  );
};

export default PROverviewCard;