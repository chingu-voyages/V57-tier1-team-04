import { useState, useEffect, useCallback } from "react";
import { Octokit } from "octokit";
import PROverviewCard from "./PrCard";

const PrList = ({ state = "open", onDataFetched, search }) => {
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
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

return (
  <div>
    {filteredAndSearchedPRs.length > 0 ? (
      <div className="flex flex-col gap-4">
        {filteredAndSearchedPRs.map((pr) => (
          <PROverviewCard key={pr.id} pr={pr} state={state} />    
        ))}
      </div>
    ) : ( 
<div className="text-center py-8 px-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 m-4">
  <h3 className="text-lg font-medium text-gray-600 mb-2">No {capitalize(state)} PRs Found</h3>
</div>
    )}
  </div>
);
};

export default PrList;