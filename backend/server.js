import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. MYSQL CONNECTION SETUP (Sequelize) ---
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Set to console.log to see raw SQL queries
  }
);

// Test Connection
sequelize.authenticate()
  .then(() => console.log("✅ MySQL connected successfully."))
  .catch((err) => console.error("❌ MySQL connection error:", err));

// --- 2. DEFINE MODELS (Tables) ---

// Technical Club Model
const TechnicalClub = sequelize.define("TechnicalClub", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
  desc: { type: DataTypes.TEXT },
  insta: { type: DataTypes.STRING },
  linkedin: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
});

// Non-Technical Club Model
const NonTechnicalClub = sequelize.define("NonTechnicalClub", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
  desc: { type: DataTypes.TEXT },
  insta: { type: DataTypes.STRING },
  linkedin: { type: DataTypes.STRING }, // Optional if not present in seed
  link: { type: DataTypes.STRING },
});

// User Model
const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING }, // Can be null if using Google Auth only
  year: { type: DataTypes.STRING },
  batch: { type: DataTypes.STRING },
  course: { type: DataTypes.STRING },
  googleId: { type: DataTypes.STRING, unique: true },
});

// Sync Database (Creates tables if they don't exist)
// force: false ensures we don't delete data on every restart
sequelize.sync({ force: false }).then(() => {
  console.log("✅ Database & Tables synced.");
});

// --- 3. API ROUTES ---

// Get Technical Clubs
app.get("/api/technical-clubs", async (req, res) => {
  try {
    const clubs = await TechnicalClub.findAll();
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching technical clubs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Non-Technical Clubs
app.get("/api/nontechnical-clubs", async (req, res) => {
  try {
    const clubs = await NonTechnicalClub.findAll();
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching non-technical clubs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- AUTHENTICATION ROUTES ---

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
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      year,
      batch,
      course,
    });

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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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

app.post("/auth/google", async (req, res) => {
  const { email, name, googleId } = req.body;

  if (!email || !name || !googleId) {
    return res.status(400).json({ message: "Google auth info missing." });
  }

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = await User.create({
        name,
        email,
        googleId,
      });
    }

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

// --- SERVE FRONTEND ---
const frontendDistPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});