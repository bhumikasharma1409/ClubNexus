const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const DutyLeave = require('../models/DutyLeave');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const deleteDuplicateDL = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const idToDelete = '692da13b44ce92f61ed888fc';
        const result = await DutyLeave.findByIdAndDelete(idToDelete);

        if (result) {
            console.log('Deleted old duplicate record:', result._id);
        } else {
            console.log('Record not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

deleteDuplicateDL();
