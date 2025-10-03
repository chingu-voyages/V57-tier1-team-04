import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start GitHub login
router.get("/github", passport.authenticate("github", { scope: ["repo"], session: false }));

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" , session: false}),
  (req, res) => {
    // Issue JWT
    const token = jwt.sign(
      { login: req.user.username, accessToken: req.user.accessToken },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send JWT in HttpOnly cookie
    res.cookie("auth", token, {
      httpOnly: true,
      secure: false, // set true in production HTTPS
      sameSite: "lax"
    });

    // Redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/home`);
  }
);

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect(process.env.FRONTEND_URL);
});

export default router;