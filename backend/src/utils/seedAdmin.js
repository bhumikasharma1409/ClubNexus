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
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }
    const salt = parseInt(process.env.BCRYPT_SALT || '10');
    const hashed = await bcrypt.hash('bhanvi', salt);
    let club = await Club.findOne({ name: 'Default Club' });
    if (!club) {
      club = new Club({ name: 'Default Club', description: 'Seed club' });
      await club.save();
    }
    const admin = new User({ name: 'Bhanvi', email: adminEmail, password: hashed, role: 'admin', club: club._id });
    await admin.save();
    console.log('Admin created:', adminEmail, 'password: bhanvi');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
