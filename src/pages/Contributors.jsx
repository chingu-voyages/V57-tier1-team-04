import { useState, useEffect } from "react";
import { Octokit } from "octokit";

function Contributors() {
    const [contributors, setContributors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchContributors = async () => {
        try {
          const octokit = new Octokit({
            auth: import.meta.env.VITE_GITHUB_TOKEN,
          });

          const contributorsResponse = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
            owner: import.meta.env.VITE_GITHUB_ORG,
            repo: import.meta.env.VITE_GITHUB_REPO_NAME,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

      const contributorsWithNames = await Promise.all(
        contributorsResponse.data.map(async (contributor) => {
          const userDetailResponse = await octokit.request("GET /users/{username}", {
            username: contributor.login,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

          const displayName = userDetailResponse.data.name || contributor.login;

          return {
            ...contributor,
            displayName: displayName,
          };
        })
      );

          setContributors(contributorsWithNames);
        } catch (error) {
          setError("Failed to fetch contributors");
          console.error(error); 
        }
      };

      fetchContributors();
    }, []);

  return (
    <section>
      <div className="main-content">
        <h2 className="main-h2">Contributors</h2>
        <p>
Developers who have worked on this project:
        </p>

          {error && <p className="text-red-600">{error}</p>}

        <ul className="flex gap-6 flex-wrap mt-8 justify-start">
          {contributors.map((contributor) => (
            <li key={contributor.id}>
              <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:opacity-80 transition-opacity text-wrap min-w-0"
              aria-label={`View ${contributor.login}'s GitHub profile`}
              >
              <img
                src={contributor.avatar_url}
                alt={`${contributor.login}'s avatar`}
                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-[#60B8DE] mb-2"
              />
            
                <span
                className="text-sm text-center text-gray-700 font-medium"
                >
                  {contributor.displayName}
                </span>
              
              </a>
          </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contributors;
