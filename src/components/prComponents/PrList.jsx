import { useState, useEffect, useCallback } from "react";
import { Octokit } from "octokit";
import PROverviewCard from "./PrCard";
import { SiTaketwointeractivesoftware } from "react-icons/si";

const PrList = ({ state = "open", onDataFetched, showDownloadButton = false, search }) => {
  const [prs, setPrs] = useState([]);
  const [error, setError] = useState(null);

const fetchPRs = useCallback(async () => {
    try {
      setError(null);

      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_TOKEN,
      });

      const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
        owner: import.meta.env.VITE_GITHUB_ORG,
        repo: import.meta.env.VITE_GITHUB_REPO_NAME,
        state: state,
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const filteredPRs = response.data.filter(pr => pr.state === state);

      const prsWithDetails = await Promise.all(
        filteredPRs.map(async (pr) => {
          try {
            const [reviewsResponse, commentsResponse] = await Promise.all([
              octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", {
                owner: import.meta.env.VITE_GITHUB_ORG,
                repo: import.meta.env.VITE_GITHUB_REPO_NAME,
                pull_number: pr.number,
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              }),
              octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
                owner: import.meta.env.VITE_GITHUB_ORG,
                repo: import.meta.env.VITE_GITHUB_REPO_NAME,
                issue_number: pr.number,
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              }),
            ]);

            return {
              ...pr,
              reviews: reviewsResponse.data,
              comments: commentsResponse.data,
            };
          } catch (error) {
            console.error(`Error fetching details for PR #${pr.number}:`, error);

            return {
              ...pr,
              reviews: [],
              comments: []
            };
          }
        })
      );

      setPrs(prsWithDetails);

      if (onDataFetched) {
        onDataFetched(prsWithDetails);
      }
    } catch (err) {
      setError("Failed to fetch pull requests. Please try again later.");
      console.error(err);
    }
  }, [state, onDataFetched]);

  useEffect(() => {
    fetchPRs();
  }, [fetchPRs]);

    if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error getting PR data: {error}
      </div>
    );
  }

  const filteredAndSearchedPRs = prs.filter(pr =>
    pr.title.toLowerCase().includes(search.toLowerCase()) ||
    pr.user.login.toLowerCase().includes(search.toLowerCase()) ||
    pr.body.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date (dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownloadJSON = () => {
    const dataToDownload = filteredAndSearchedPRs.map(pr => {
      let lastAction = null;
      if (state === 'open') {
        const events = [];
        events.push({ date: new Date(pr.created_at), action: 'created' });

        if (pr.comments && pr.comments.length > 0) {
          pr.comments.forEach(comment => {
            events.push({ date: new Date(comment.created_at), action: 'commented' });
          });
        }

        if (pr.reviews && pr.reviews.length > 0) {
          pr.reviews.forEach(review => {
            if (review.state === 'CHANGES_REQUESTED') {
              events.push({ date: new Date(review.submitted_at), action: 'changes_requested' });
            } else if (review.state === 'COMMENTED') {
              events.push({ date: new Date(review.submitted_at), action: 'commented' });
            }
          });
        }

        events.sort((a, b) => b.date - a.date);
        lastAction = {
          action: events[0].action,
          date: formatDate(events[0].date)
        };
      }

      return {
        id: pr.id,
        title: pr.title,
        state: pr.state,
        created_at: pr.created_at,
        closed_at: pr.closed_at,
        author: pr.user.login,
        url: pr.html_url,
        reviewers: pr.requested_reviewers?.map(reviewer => reviewer.login) || [],
        last_action: lastAction
      };
    });

    const jsonString = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob ([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${state}-prs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

return (
  <div>
    {filteredAndSearchedPRs.length > 0 ? (
      <div className="flex flex-col gap-4">
        {filteredAndSearchedPRs.map((pr) => (
          <PROverviewCard key={pr.id} pr={pr} state={SiTaketwointeractivesoftware} />    
        ))}
        {showDownloadButton && (
          <button onClick={handleDownloadJSON}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download JSON
          </button>
        )}
      </div>
    ) : ( 
      <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-600 mb-2">No {state} PRs Found</h3>
      </div>
    )}
  </div>
);
};

export default PrList;