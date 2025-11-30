const mongoose = require('mongoose');
const User = require('./src/models/User');
const Club = require('./src/models/Club');
require('dotenv').config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clubnexus');
        console.log('Connected to DB');

        const admin = await User.findOne({ email: 'bhanvisahni@gmail.com' });
        console.log('Admin User:', admin);

        if (admin && admin.club) {
            const club = await Club.findById(admin.club);
            console.log('Linked Club:', club);
        } else {
            console.log('Admin has no club linked.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
