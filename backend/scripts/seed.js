require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Correct paths (seed.js is inside /scripts/)
const connectDB = require('../src/config/db');
const Club = require('../src/models/Club');
const Admin = require('../src/models/Admin');

(async () => {
  try {
    // Connect to DB
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear old data
    await Club.deleteMany({});
    await Admin.deleteMany({});

    // Create sample clubs
    const clubs = await Club.insertMany([
      { name: 'Coding Club', description: 'Tech & coding club' },
      { name: 'Drama Club', description: 'Drama & theatre club' }
    ]);

    // Admin password (hash it)
    const hashedPassword = await bcrypt.hash('adminpass123', 10);

    // Create admin with correct fields
    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@college.edu",
      password: hashedPassword,
      club: clubs[0]._id   // admin belongs to Coding Club
    });

    console.log("\n🌱 Seed Complete!");
    console.log("-------------------------------------");
    console.log("Admin Credentials:");
    console.log("Email: admin@college.edu");
    console.log("Password: adminpass123");
    console.log("-------------------------------------\n");

    process.exit();
  } catch (err) {
    console.error("Seed Error:", err);
    process.exit(1);
  }
})();
