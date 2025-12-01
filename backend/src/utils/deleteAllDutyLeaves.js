const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const DutyLeave = require('../models/DutyLeave');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const deleteAllDutyLeaves = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await DutyLeave.deleteMany({});
        console.log(`Deleted all ${result.deletedCount} duty leave records.`);

        process.exit(0);
    } catch (error) {
        console.error('Error clearing duty leaves:', error);
        process.exit(1);
    }
};

deleteAllDutyLeaves();
