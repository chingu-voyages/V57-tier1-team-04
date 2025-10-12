import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Start GitHub login
router.get("/github", passport.authenticate("github", { scope: ["repo"], session: false }));

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: `${process.env.FRONTEND_URL}/login` , session: false}),
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
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("auth", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });
    res.status(200).json({ message: "Logged out successfully" });
});

router.get("/user", (req, res) => {
  const token = req.cookies?.auth;

  if (!token) {
    return res.json({
      userType: "guest",
      user:"Guest",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({
      userType: "github",
      user: user ,
    });
  } catch (err) {
    return res.json({
      userType: "guest",
      user: { name: "Guest" },
    });
  }
});


export default router;