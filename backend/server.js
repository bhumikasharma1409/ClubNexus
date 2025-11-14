import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

// --- Configuration and Setup ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ES Module equivalent for __dirname (for serving static files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Mongoose Schemas ---

// Schema for both club types
const clubSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  img: String,
  desc: String,
  insta: String,
  linkedin: String,
  link: String,
});

// Models for the two club collections
const TechnicalClub = mongoose.model("TechnicalClub", clubSchema);
const NonTechnicalClub = mongoose.model("NonTechnicalClub", clubSchema);

// Schema for Users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true },
  year: { type: String, required: true },
  batch: { type: String, required: true },
  course: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
});

const User = mongoose.model("User", userSchema);

// --- API Routes for Clubs ---

// Get all Technical Clubs
app.get("/api/technical-clubs", async (req, res) => {
  try {
    const clubs = await TechnicalClub.find({});
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching technical clubs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all Non-Technical Clubs
app.get("/api/nontechnical-clubs", async (req, res) => {
  try {
    const clubs = await NonTechnicalClub.find({});
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching non-technical clubs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- API Routes for Authentication ---

// Validation Schema for Registration
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  year: Joi.string().required(),
  batch: Joi.string().required(),
  course: Joi.string().required(),
});

// POST /auth/register
app.post("/auth/register", async (req, res) => {
  // 1. Validate input
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, year, batch, course } = req.body;

  try {
    // 2. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      year,
      batch,
      course,
    });

    // 5. Save user to DB
    await user.save();

    // 6. Create and send token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3600s", // 1 hour
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Validation Schema for Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// POST /auth/login
app.post("/auth/login", async (req, res) => {
  // 1. Validate input
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Create and send token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3600s",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Deployment: Serve React App ---
// This part is for serving your built React app from the 'frontend/dist' folder
const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");

// Serve static files
app.use(express.static(frontendDistPath));

// Fallback: For any route not matched by API, send index.html
// This lets React Router handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5001; // Use 5001 as local fallback
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});