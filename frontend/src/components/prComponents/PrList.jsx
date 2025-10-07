import { useState, useEffect, useCallback } from "react";
import { Octokit } from "octokit";
import PROverviewCard from "./PrCard";
import { useAuth } from "../context/AuthContext";
import { fetchPrs } from "../../api/prApi"; // backend API for logged-in GitHub users

const PrList = ({ state = "open", onDataFetched, search }) => {
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
  const [prs, setPrs] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const fetchPRs = useCallback(async () => {
    try {
      setError(null);
      let prsWithDetails = [];

      // ----- Guest login flow -----
      if (auth.userType === "guest") {
        const octokit = new Octokit({
          auth: import.meta.env.VITE_GITHUB_TOKEN, // token for guest access
        });

        // Limit to 20 PRs max
        const response = await octokit.request(
          "GET /repos/{owner}/{repo}/pulls",
          {
            owner: import.meta.env.VITE_GITHUB_ORG,
            repo: import.meta.env.VITE_GITHUB_REPO_NAME,
            state,
            per_page: 20, // ⬅️ changed from 100 to 20
            headers: { "X-GitHub-Api-Version": "2022-11-28" },
          }
        );

        if (!response?.data) {
          setPrs([]);
          return;
        }

        // Limit the result even if GitHub sends more
        const filteredPRs = response.data
          .filter((pr) => pr.state === state)
          .slice(0, 20); // ⬅️ just to be safe

        prsWithDetails = await Promise.all(
          filteredPRs.map(async (pr) => {
            try {
              const [reviewsResponse, commentsResponse] = await Promise.all([
                octokit.request(
                  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
                  {
                    owner: import.meta.env.VITE_GITHUB_ORG,
                    repo: import.meta.env.VITE_GITHUB_REPO_NAME,
                    pull_number: pr.number,
                    headers: { "X-GitHub-Api-Version": "2022-11-28" },
                  }
                ),
                octokit.request(
                  "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
                  {
                    owner: import.meta.env.VITE_GITHUB_ORG,
                    repo: import.meta.env.VITE_GITHUB_REPO_NAME,
                    issue_number: pr.number,
                    headers: { "X-GitHub-Api-Version": "2022-11-28" },
                  }
                ),
              ]);

              return {
                ...pr,
                reviews: reviewsResponse?.data || [],
                comments: commentsResponse?.data || [],
              };
            } catch (err) {
              console.error(`Error fetching details for PR #${pr.number}:`, err);
              return { ...pr, reviews: [], comments: [] };
            }
          })
        );
      } 
      // ----- Logged-in GitHub user flow -----
      else if (auth.userType === "github") {
        prsWithDetails = await fetchPrs(state); // backend call
      }

      setPrs(prsWithDetails);
      if (onDataFetched) onDataFetched(prsWithDetails);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pull requests. Please try again later.");
    }
  }, [state, onDataFetched, auth.userType]);

  useEffect(() => {
    if (auth.userType) fetchPRs(); // fetch only when auth status is determined
  }, [fetchPRs, auth.userType]);

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error getting PR data: {error}
      </div>
    );
  }

  if (!prs) return null; // avoid undefined errors

  const searchTerm = (search || "").toLowerCase();
  const filteredAndSearchedPRs = prs.filter(
    (pr) =>
      pr.title?.toLowerCase().includes(searchTerm) ||
      pr.user?.login?.toLowerCase().includes(searchTerm) ||
      (pr.body?.toLowerCase() || "").includes(searchTerm)
  );

  return (
    <div>
      {filteredAndSearchedPRs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredAndSearchedPRs.map((pr, index) => (
            <PROverviewCard
              key={pr.id}
              pr={pr}
              state={state}
              defaultOpen={index < 3}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 m-4">
          <p className="text-lg font-medium text-gray-600 mb-2">
            No {capitalize(state)} PRs Found
          </p>
        </div>
      )}
    </div>
  );
};

export default PrList;
