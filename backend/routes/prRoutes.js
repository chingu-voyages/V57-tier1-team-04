import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { getUserRepos, getRepoPRs } from "../utils/github.js";

const router = express.Router();

// Fetch PRs across all repos with optional state filter
router.get("/", requireAuth, async (req, res) => {
  try {
    const { accessToken } = req.user;
    const state = req.query.state || "all"; // open, closed, merged, all

    const repos = await getUserRepos(accessToken);
    const allPRs = [];

    for (const repo of repos) {
      const prs = await getRepoPRs(accessToken, repo.owner.login, repo.name, state);

      // If state=merged, only keep merged PRs
      if (state === "merged") {
        allPRs.push(...prs.filter(pr => pr.merged));
      } else {
        allPRs.push(...prs);
      }
    }

    res.json(allPRs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;