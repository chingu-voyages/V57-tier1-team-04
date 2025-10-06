import { useState } from 'react'; // for accordion

import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import { IoMdStopwatch, IoIosGitMerge } from "react-icons/io";
import { RiGitClosePullRequestFill } from "react-icons/ri";
import { LuGitPullRequestArrow } from "react-icons/lu";
import { MdComment } from "react-icons/md";

const PROverviewCard = ({ pr, state, defaultOpen = false }) => {

  //state for accordion, by default false
const [isOpen, setIsOpen] = useState(defaultOpen);

//toggle function for accordion
const toggleAccordion = () => {
  setIsOpen(!isOpen);
};

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
    <div className="card">
      
      {/* Accordion Title: Clickable button with aria-expanded */}
      
      <button 
        className="flex justify-between items-center cursor-pointer select-none pb-2 w-full text-left bg-transparent border-0"
        onClick={toggleAccordion} // Assign toggle function
        aria-expanded={isOpen} // Accessibility attribute
        aria-controls={`pr-details-${pr.number}`} //Wire the button to the content
        aria-label={`Toggle details for pull request #${pr.number}: ${pr.title}`}
      >
        <div className="flex items-center gap-2 pr-8">
                <div className="flex items-center gap-3">
                    <img
                        src={pr.user.avatar_url}
                        alt={`${pr.user.login}'s profile picture`}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="user-name text-gray-800 font-medium">{pr.user.login}</span>

                    {pr.comments && pr.comments.length > 0 && (
                        <div className="pr-comments flex items-center gap-1 text-gray-600 text-xs"
                             aria-label={`${pr.comments.length} comment${pr.comments.length !== 1 ? 's' : ''}`}
                            >
                            <span className="flex items-center justify-center gap-1 text-xs font-medium">
                                <MdComment aria-hidden="true" />
                                {pr.comments.length}
                            </span>
                        </div>
                    )}
                </div>
          <span className="text-green-600 font-semibold text-xs">#{pr.number}</span>
        </div>

        {/* Icon shows the status: open or close the card */}

        <span className="text-xs font-bold text-gray-500 transform transition-transform duration-300 ml-4"
          aria-hidden="true"
        >
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* PR Title*/}

      <div className="flex flex-col gap-1 mb-2">
        <a
          href={pr.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-semibold text-sm hover:text-[#60B8DE] hover:underline transition-colors"
          >
            {pr.title}
        </a>
      </div>
      
      
      {/* Accordion Body: Show only if isOpen = true */}
      {/* When opacity-0 is applied, that wrapper becomes invisible, and grid-rows-[0fr] slides the invisible section upwards. */}
      <div 
        className={`
          grid transition-all duration-700 ease-in-out 
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} 
          overflow-hidden
        `}
        id={`pr-details-${pr.number}`} //Give content a unique ID
      >
        {/* Content Wrapper */}
        <div className="overflow-hidden">
          <div className="mt-2 pt-2 border-t border-gray-200">
            
            {/* Description */}
            <p className="text-gray-500 text-xs mb-3">{pr.body || "No description provided"}</p>

            {/* Details */}
            <div className="semi-card grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-200 p-3 rounded-lg">
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
            </div> 
          </div> 
        
            {/* Review */}
            <div className="flex justify-between items-center mt-3">

              {/* Left Group: PR Icon and Status Badge */}
              <div className="flex items-center gap-2">
                <span aria-hidden="true">
                  {pr.state === "open" ? <LuGitPullRequestArrow /> : pr.state === "closed" ? <RiGitClosePullRequestFill /> : <IoIosGitMerge />}
                </span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${
                    pr.state === "open" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pr.state === "open" ? "OPEN" : pr.state.toUpperCase()}
                </span>
              </div>
    
              {/* Right Group: Button */}
            <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 md:px-4 md:py-2 bg-[#60B8DE] text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors inline-block"
                  aria-label={`${pr.state === "open" ? 'Review' : 'View'} pull request #${pr.number} on GitHub`}
                >
                  {pr.state === "open" ? "Review" : "View PR"}
                </a>
              </div>
            </div>
          </div> 
        </div>
  );
};

export default PROverviewCard;

