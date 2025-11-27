// src/utils/jwt.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

exports.createToken = (user) => {
  // user must have id, email, role, club_id (club_id can be null)
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    club_id: user.club_id ?? null,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
