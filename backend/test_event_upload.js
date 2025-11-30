const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function run() {
    try {
        // 1. Login
        console.log('Logging in...');
        const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
            email: 'bhanvisahni@gmail.com',
            password: 'bhanvi'
        });

        const token = loginRes.data.token;
        console.log('Login Response Data:', JSON.stringify(loginRes.data, null, 2));

        if (!loginRes.data.user.club) {
            throw new Error('User has no club linked!');
        }
        const clubId = loginRes.data.user.club._id;
        console.log('Login successful. Token:', token ? 'Yes' : 'No');
        console.log('Club ID:', clubId);

        // 2. Create dummy image
        fs.writeFileSync('test_image.jpg', 'dummy content');

        // 3. Upload Event
        console.log('Uploading event...');
        const form = new FormData();
        form.append('title', 'Test Event');
        form.append('description', 'Test Description');
        form.append('date', '2023-12-25');
        form.append('time', '10:00');
        form.append('place', 'Test Place');
        form.append('club', clubId);
        form.append('poster', fs.createReadStream('test_image.jpg'));

        const uploadRes = await axios.post('http://localhost:5001/api/events', form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Upload success:', uploadRes.data);

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}

run();
