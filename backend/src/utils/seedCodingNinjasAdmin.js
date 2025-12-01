// src/utils/seedCodingNinjasAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Club = require('../models/Club');

const run = async () => {
    try {
        await connectDB();
        const adminEmail = 'bhumika6432@gmail.com';
        const adminPassword = 'bhumika';

        const salt = parseInt(process.env.BCRYPT_SALT || '10');
        const hashed = await bcrypt.hash(adminPassword, salt);

        // 1. Find or Create Club
        let club = await Club.findOne({ name: 'Coding Ninjas' });
        if (!club) {
            club = new Club({
                name: 'Coding Ninjas',
                description: 'Sharpen coding skills with contests, projects, and mentorship.',
                category: 'Technical'
            });
            await club.save();
            console.log('Club created: Coding Ninjas');
        } else {
            console.log('Club found: Coding Ninjas');
        }

        // 2. Update or Create Admin User
        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            {
                name: 'Bhumika',
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
