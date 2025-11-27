// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const mongoose = require("../config/db");
const User = require("../models/userModel");
const { createToken } = require("../utils/jwt");

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = "club_admin", club_id = null } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "password must be at least 6 characters" });
    }

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({
      name,
      email,
      password_hash: hashed,
      role,
      club_id,
    });
    await newUser.save();

    const user = {
      id: newUser._id,
      name,
      email,
      role,
      club_id,
    };

    const token = createToken(user);

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const userRow = await User.findOne({ email });
    if (!userRow) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, userRow.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const user = {
      id: userRow._id,
      name: userRow.name,
      email: userRow.email,
      role: userRow.role,
      club_id: userRow.club_id,
    };

    const token = createToken(user);

    return res.json({ token, user });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.me = async (req, res) => {
  // protected route — authMiddleware will set req.user
  try {
    const user = req.user;
    // Optionally fetch fresh user from DB
    const userDoc = await User.findById(user.id).select("_id name email role club_id");
    if (!userDoc) return res.status(404).json({ error: "User not found" });
    return res.json({ user: userDoc });
  } catch (err) {
    console.error("me error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
