import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";

import initPassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import prRoutes from "./routes/prRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser());

// Initialize passport (for OAuth)
initPassport();
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/prs", prRoutes);

app.get("/", (req, res) => res.send("🚀 GitHub PR App running. Go to /auth/github to login."));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));