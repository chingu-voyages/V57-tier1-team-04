import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import { IoMdStopwatch, IoIosGitMerge } from "react-icons/io";
import { RiGitClosePullRequestFill } from "react-icons/ri";
import { LuGitPullRequestArrow } from "react-icons/lu";
import { MdComment } from "react-icons/md";

const PROverviewCard = ({ pr, state }) => {

  const formatDate = (dateString) =>{
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });   
  };
  const getLastAction = (pr) => {
    const events = [];

    events.push({
      type: "created",
      date: new Date(pr.created_at),
      action: "created",  
    });

    if (pr.comments && pr.comments.length > 0) {
      pr.comments.forEach((comment) => {
        events.push({
          type: "commented",
          date: new Date(comment.created_at),
          action: "commented",
        });
      });
    }

    if (pr.reviews && pr.reviews.length > 0) {
      pr.reviews.forEach((review) => {
        if (review.state === "CHANGES_REQUESTED") {
          events.push({
            type: "changes_requested",
            date: new Date(review.submitted_at),
            action: "change requested",
          });
        } else if (review.state === "COMMENTED") {
          events.push({
            type: "commented",
            date: new Date(review.submitted_at),
            action: "commented",
          });
        }
      });
    }

    events.sort((a, b) => b.date - a.date);
    const lastEvent = events[0];
    return{
      action: lastEvent.action,
      date: formatDate(lastEvent.date)
    };  
  }

  const lastAction = state === "open" ? getLastAction(pr) : null;

  return (
    <div className="closed-cards">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 pr-8">
          {pr.state==="open"? <LuGitPullRequestArrow />: pr.state==="closed"? <RiGitClosePullRequestFill/>:<IoIosGitMerge />}
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm  ${
              pr.state === "open" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
            }`}
          >
            {pr.state === "open" ? "OPEN" : pr.state.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="closed-cards-a text-black font-semibold text-lg hover:text-[#60B8DE] hover:underline transition-colors"
          >
            {pr.title}
        </a>
        <p className="closed-cards-p text-gray-500 text-sm">{pr.body || "No description provided"}</p>
      </div>
<div className="semi-card grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
        <div>
          <span className="font-medium text-gray-700">Created on: </span>
          <span className="text-gray-600">{formatDate(pr.created_at)}</span>
        </div>

        {state === "closed" && pr.closed_at && (
          <div>
            <span className="font-medium text-gray-700">Closed on: </span>
            <span className="text-gray-600">{formatDate(pr.closed_at)}</span>
          </div>
        )}

        {state === "open" && lastAction && (
          <div>
            <span className="font-medium text-gray-700">Last Action: </span>
            <span className="text-gray-600">{lastAction.action} on {lastAction.date}</span>
          </div>
        )}

        <div>
          <span className="font-medium text-gray-700">Reviewers: </span>
          {(()=> {
            if (state === "closed" && pr.reviews && pr.reviews.length > 0) {
              const reviewers = [...new Set(pr.reviews.map((review) => review.user.login))];
              return <span className="ml-1 text-gray-600">{reviewers.join(", ")}</span>;
            }

            if (pr.requested_reviewers && pr.requested_reviewers.length > 0) {
              return (
                <span className="ml-1 text-gray-600">
                  {pr.requested_reviewers.map((rev) => rev.login).join(", ")}
                </span>
              );
            }

            return <span className="ml-1 text-gray-600">None</span>;
          })()}
        </div>
      </div>  {/* CLOSE GRID HERE - Add this closing tag after line 129 */}

      {/* Author section - now outside the grid */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <img
            src={pr.user.avatar_url}
            alt={pr.user.login}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-800 font-medium">{pr.user.login}</span>
        </div>
      </div>

      {/* PR number and button section - now outside the grid */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">#{pr.number}</span>

          {pr.comments && pr.comments.length > 0 && (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <span className="flex items-center justify-center gap-1 text-sm font-medium">
                <MdComment />{pr.comments.length}
              </span>
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-[#60B8DE] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {pr.state === "open" ? "Review" : "View PR"}
        </div>
      </div>
    </div>
  );
};

export default PROverviewCard;