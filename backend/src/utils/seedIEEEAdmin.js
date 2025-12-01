// src/utils/seedIEEEAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Club = require('../models/Club');

const run = async () => {
    try {
        await connectDB();
        const adminEmail = 'jainbhavya06@gmail.com';
        const adminPassword = 'bhavya';

        const salt = parseInt(process.env.BCRYPT_SALT || '10');
        const hashed = await bcrypt.hash(adminPassword, salt);

        // 1. Find or Create Club
        let club = await Club.findOne({ name: 'IEEE' });
        if (!club) {
            club = new Club({
                name: 'IEEE',
                description: 'Innovate with technology, research, and professional networking.',
                category: 'Technical'
            });
            await club.save();
            console.log('Club created: IEEE');
        } else {
            console.log('Club found: IEEE');
        }

        // 2. Update or Create Admin User
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            {
                name: 'Bhavya',
                password: hashed,
                role: 'admin',
                club: club._id,
                // Ensure OTP fields are reset
                otp: undefined,
                otpExpires: undefined
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
