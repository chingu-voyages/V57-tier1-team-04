import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const token = req.cookies?.auth;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}