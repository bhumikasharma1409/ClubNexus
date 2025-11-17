import express from "express";
import cors from "cors";
import mongoose from "mongoose";
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


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));



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


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  

  year: { type: String },
  batch: { type: String },
  course: { type: String },


  password: { type: String, minlength: 6 },
  

  googleId: { type: String, sparse: true, unique: true } 
});

const User = mongoose.model("User", userSchema);



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

    let user = await User.findOne({ email: email });

    if (user) {

      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

    } else {

      user = new User({
        name,
        email,
        googleId,
      });
      await user.save();
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