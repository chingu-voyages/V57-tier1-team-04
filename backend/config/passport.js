import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

export default function initPassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/github/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        // Save GitHub token in profile
        profile.accessToken = accessToken;
        return done(null, profile);
      }
    )
  );
}