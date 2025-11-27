// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", authMiddleware, me);

module.exports = router;
