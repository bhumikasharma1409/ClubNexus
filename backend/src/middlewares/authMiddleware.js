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

// role helper
exports.requireRole = (allowed) => (req, res, next) => {
  const role = req.user?.role;
  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];
  if (!role || !allowedRoles.includes(role)) {
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  }
  next();
};
