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
  const [loading, setLoading]= useState(false);

  const fetchPRs = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);

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
            per_page: 100, 
            headers: { "X-GitHub-Api-Version": "2022-11-28" },
          }
        );
        const filteredPRs = response.data.filter((pr) => pr.state === state)

        const prsWithDetails = await Promise.all(
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
                reviews: reviewsResponse.data,
                comments: commentsResponse.data ,
              };
            } catch (err) {
              console.error(`Error fetching details for PR #${pr.number}:`, err);
              return { ...pr, reviews: [], comments: [] };
            }
          })
        );
        setPrs(prsWithDetails);
        if (onDataFetched) {
        onDataFetched(prsWithDetails);}
      } 
      else if (auth.userType === "github") {
        const prsWithDetails = await fetchPrs(state);
        setPrs(prsWithDetails);
        if (onDataFetched) {
        onDataFetched(prsWithDetails.allPRs);}
      }
    } catch (err) {
      setError("Failed to fetch pull requests. Please try again later.");
      console.error(err);
    }
    setLoading(false);
  }, [state, onDataFetched, auth.user]);

  useEffect(() => {
    if (auth.userType) {fetchPRs()}; // fetch only when auth status is determined
  }, []);

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error getting PR data: {error}
      </div>
    );
  }

  const searchTerm = (search || "").toLowerCase();

  const filteredAndSearchedPRs = prs.filter(
    (pr) =>
      pr.title?.toLowerCase().includes(searchTerm) ||
      pr.user?.login?.toLowerCase().includes(searchTerm) ||
      (pr.body?.toLowerCase() || "").includes(searchTerm)
  );

  return (
    <div>
      {
        loading===true ?
        (
          <div className="flex items-center justify-center">
            <img src="/search.gif" alt="Searching prs" className="bg-gray-200 rounded-2xl size-50"/>
          </div>
        ):
          filteredAndSearchedPRs.length > 0 ? (
              <div className="flex flex-col gap-4 text-gray-200">
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
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No {capitalize(state)} PRs Found
                </h3>
              </div>
            )
      }
    </div>
  );
};

export default PrList;




