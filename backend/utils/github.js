import axios from "axios";

// Get all repos user has access to
export async function getUserRepos(token) {
  const res = await axios.get("https://api.github.com/user/repos", {
    headers: { Authorization: `token ${token}` }
  });
  return res.data;
}

// Get PRs for a repo with state filter
export async function getRepoPRs(token, owner, repo, state = "all") {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}`,
    { headers: { Authorization: `token ${token}` } }
  );

  return res.data.map(pr => ({
    repo: `${owner}/${repo}`,
    number: pr.number,
    title: pr.title,
    state: pr.state, // open / closed
    merged: pr.merged_at !== null,
    createdAt: pr.created_at,
    closedAt: pr.closed_at,
    mergedAt: pr.merged_at
  }));
}