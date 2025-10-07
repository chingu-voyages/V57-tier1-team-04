// routes/prRoutes.js
import express from "express";
import axios from "axios";
import { requireAuth } from "../middleware/auth.js"; // your JWT middleware

const router = express.Router();

// Fetch PRs for the authenticated user
// routes/prRoutes.js
router.get("/", requireAuth, async (req, res) => {
  try {
    const accessToken = req.user.accessToken;
    const state = req.query.state || "open"; 

    console.log("🔹 Fetching PRs for:", req.user.login);
    console.log("🔹 State:", state);

    // Get user repos
    const reposRes = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const repos = reposRes.data;
    console.log(`🔹 Found ${repos.length} repos for user`);

    const allPRs = [];

    for (const repo of repos) {
      console.log(`   📁 Checking repo: ${repo.name}`);

      const prsRes = await axios.get(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls`,
        {
          headers: { Authorization: `token ${accessToken}` },
          params: { state, per_page: 100 },
        }
      );

      const prs = prsRes.data;
      console.log(`     → Found ${prs.length} ${state} PRs in ${repo.name}`);

      const prsWithDetails = await Promise.all(
        prs.map(async (pr) => {
          try {
            const [reviewsRes, commentsRes] = await Promise.all([
              axios.get(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls/${pr.number}/reviews`,
                { headers: { Authorization: `token ${accessToken}` } }
              ),
              axios.get(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues/${pr.number}/comments`,
                { headers: { Authorization: `token ${accessToken}` } }
              ),
            ]);

            return {
              ...pr,
              reviews: reviewsRes.data,
              comments: commentsRes.data,
            };
          } catch (err) {
            console.warn(`⚠️ Error fetching details for PR #${pr.number}`, err.message);
            return { ...pr, reviews: [], comments: [] };
          }
        })
      );

      allPRs.push(...prsWithDetails);
    }

    console.log(`✅ Total PRs collected: ${allPRs.length}`);
    res.json(allPRs);
  } catch (err) {
    console.error("❌ Error fetching PRs:", err.message);
    res.status(500).json({ error: "Failed to fetch PRs" });
  }
});

export default router;
