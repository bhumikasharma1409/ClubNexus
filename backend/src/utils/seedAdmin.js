// src/utils/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Club = require('../models/Club');

const run = async () => {
  try {
    await connectDB();
    const adminEmail = 'bhanvisahni@gmail.com';
    // Check removed to allow update
    const salt = parseInt(process.env.BCRYPT_SALT || '10');
    const hashed = await bcrypt.hash('bhanvi', salt);
    let club = await Club.findOne({ name: 'Open Source' });
    if (!club) {
      club = new Club({
        name: 'Open Source',
        description: 'Contribute to real-world projects and collaborate globally.',
        category: 'Technical'
      });
      await club.save();
    }

    // Update or create admin
    const admin = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: 'Bhanvi',
        password: hashed,
        role: 'admin',
        club: club._id
      },
      { upsert: true, new: true }
    );

    console.log('Admin created/updated:', adminEmail, 'for club:', club.name);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
