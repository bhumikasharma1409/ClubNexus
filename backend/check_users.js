require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const users = await User.find({}).sort({ createdAt: -1 }).limit(5);
        console.log('--- Registered Users (Last 5) ---');
        users.forEach(u => {
            console.log(`Name: ${u.name}`);
            console.log(`Email: ${u.email}`);
            console.log(`Role: ${u.role}`);
            console.log(`Year: ${u.year}, Batch: ${u.batch}, Course: ${u.course}`);
            console.log('-------------------');
        });
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
