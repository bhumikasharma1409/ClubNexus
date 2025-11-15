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

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Mongoose Schemas ---

const clubSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  img: String,
  desc: String,
  insta: String,
  linkedin: String,
  link: String,
});

const TechnicalClub = mongoose.model("TechnicalClub", clubSchema);
const NonTechnicalClub = mongoose.model("NonTechnicalClub", clubSchema);

// UPDATED User Schema for Google Auth
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  
  // These are optional because Google Sign-In won't provide them
  year: { type: String },
  batch: { type: String },
  course: { type: String },

  // Password is no longer "required" at schema level,
  // because a user can sign in with Google instead.
  password: { type: String, minlength: 6 },
  
  // This field will link their Google account (it's new)
  googleId: { type: String, sparse: true, unique: true } 
});

const User = mongoose.model("User", userSchema);


// --- API Routes for Clubs ---
app.get("/api/technical-clubs", async (req, res) => {
  try {
    const clubs = await TechnicalClub.find({});
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching technical clubs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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

// POST /auth/register
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  year: Joi.string().required(),
  batch: Joi.string().required(),
  course: Joi.string().required(),
});

app.post("/auth/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, year, batch, course } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      year,
      batch,
      course,
    });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3600s" });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /auth/login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

app.post("/auth/login", async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Check if user has a password (they might be Google-only)
    if (!user.password) {
      return res.status(400).json({ message: "Please sign in with Google." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3600s" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// *** NEW ROUTE FOR GOOGLE AUTH ***
// POST /auth/google
app.post("/auth/google", async (req, res) => {
  const { email, name, googleId } = req.body;

  if (!email || !name || !googleId) {
    return res.status(400).json({ message: "Google auth info missing." });
  }

  try {
    // 1. Find user by email
    let user = await User.findOne({ email: email });

    if (user) {
      // 2. User exists. If they don't have a googleId, add it.
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      // If they do have a googleId, we just log them in.
    } else {
      // 3. No user found, create a new one
      user = new User({
        name,
        email,
        googleId,
      });
      await user.save();
    }

    // 4. User is found OR created. Log them in.
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3600s" });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ message: "Server error during Google auth" });
  }
});


// --- Deployment: Serve React App ---
const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});