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

          const response = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
            owner: import.meta.env.VITE_GITHUB_ORG,
            repo: import.meta.env.VITE_GITHUB_REPO_NAME,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });

          setContributors(response.data);
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
Developers who work in this project:
        </p>

          {error && <p className="text-red-600">{error}</p>}

        <ul className="flex gap-4 flex-wrap mt-8">
          {contributors.map((contributor) => (
            <li key={contributor.id}>
              <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
              >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-[#60B8DE]"
              />
              </a>
          </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contributors;
