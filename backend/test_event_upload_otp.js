const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

async function run() {
    try {
        // Connect to DB to read OTP
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/clubnexus');

        // 1. Login (Trigger OTP)
        console.log('1. Logging in...');
        await axios.post('http://localhost:5001/api/auth/login', {
            email: 'bhanvisahni@gmail.com',
            password: 'bhanvi'
        });

        // 2. Get OTP from DB
        console.log('2. Fetching OTP from DB...');
        const user = await User.findOne({ email: 'bhanvisahni@gmail.com' });
        const otp = user.otp;
        console.log('OTP:', otp);

        // 3. Verify OTP
        console.log('3. Verifying OTP...');
        const verifyRes = await axios.post('http://localhost:5001/api/auth/verify-otp', {
            email: 'bhanvisahni@gmail.com',
            otp: otp
        });

        const token = verifyRes.data.token;
        const club = verifyRes.data.user.club;
        console.log('Token received.');
        console.log('User Club:', club);

        if (!club) throw new Error('No club in user object');

        // 4. Upload Event
        console.log('4. Uploading event...');
        fs.writeFileSync('test_image.jpg', 'dummy content');

        const form = new FormData();
        form.append('title', 'Test Event');
        form.append('description', 'Test Description');
        form.append('date', '2023-12-25');
        form.append('time', '10:00');
        form.append('place', 'Test Place');
        form.append('club', club._id || club); // Handle object or string
        form.append('poster', fs.createReadStream('test_image.jpg'));

        const uploadRes = await axios.post('http://localhost:5001/api/events', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Upload success:', uploadRes.data);
        process.exit(0);

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
        process.exit(1);
    }
}

run();
