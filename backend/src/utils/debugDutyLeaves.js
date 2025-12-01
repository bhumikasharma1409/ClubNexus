const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const DutyLeave = require('../models/DutyLeave');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const debugDutyLeaves = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find all DLs for Bhumika Sharma
        const dls = await DutyLeave.find({ studentName: 'Bhumika Sharma' });
        console.log('Found Duty Leaves for Bhumika Sharma:', JSON.stringify(dls, null, 2));

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugDutyLeaves();
