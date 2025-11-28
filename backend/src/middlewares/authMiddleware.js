// src/middlewares/authMiddleware.js
const { verifyToken } = require("../utils/jwt");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(401).json({ error: "Missing Authorization token" });

  try {
    const payload = verifyToken(token);
    // Attach user info to request (id, email, role, club_id)
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      club_id: payload.club_id ?? null,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
