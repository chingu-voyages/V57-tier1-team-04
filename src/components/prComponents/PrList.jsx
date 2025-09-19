import { useState, useEffect, useCallback } from "react";
import { Octokit } from "octokit";
import PROverviewCard from "./PrCard";

const PrList = ({ state = "open", onDataFetched, showDownloadButton = false }) => {
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
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const filteredPRs = response.data.filter(pr => pr.state === state);
      setPrs(filteredPRs);

      if (onDataFetched) {
        onDataFetched(filteredPRs);
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

return (
  <div>
    {prs.length > 0 ? (
      <div className="flex flex-col gap-4">
        {prs.map((pr) => (
          <PROverviewCard key={pr.id} pr={pr} />    
        ))}
        {showDownloadButton && (
          <button>Download JSON</button>
        )}
      </div>
    ) : ( 
      <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-600 mb-2">No {state} PRs Found</h3>
      </div>
    )}
  </div>
);
}

export default PrList;