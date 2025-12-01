const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Club = require('../models/Club');
const DutyLeave = require('../models/DutyLeave');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDutyLeaves = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const club = await Club.findOne({ name: 'Open Source' });
        if (!club) {
            console.log('Open Source club not found');
            process.exit(1);
        }

        // Clear existing DLs for this club
        await DutyLeave.deleteMany({ club: club._id });

        const dutyLeaves = [
            {
                studentName: 'Aarav Sharma',
                rollNo: '2010991234',
                eventName: 'Hackathon 2024',
                date: new Date('2024-12-10'),
                status: 'Pending',
                club: club._id
            },
            {
                studentName: 'Ishita Gupta',
                rollNo: '2010995678',
                eventName: 'Code Workshop',
                date: new Date('2024-12-12'),
                status: 'Pending',
                club: club._id
            },
            {
                studentName: 'Rohan Mehta',
                rollNo: '2010998765',
                eventName: 'Tech Talk',
                date: new Date('2024-11-28'),
                status: 'Approved',
                club: club._id
            },
            {
                studentName: 'Sneha Patel',
                rollNo: '2010994321',
                eventName: 'Hackathon 2024',
                date: new Date('2024-12-10'),
                status: 'Approved',
                club: club._id
            },
            {
                studentName: 'Vikram Singh',
                rollNo: '2010999999',
                eventName: 'AI Seminar',
                date: new Date('2024-12-15'),
                status: 'Rejected',
                club: club._id
            }
        ];

        await DutyLeave.insertMany(dutyLeaves);
        console.log('Duty Leaves seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding duty leaves:', error);
        process.exit(1);
    }
};

seedDutyLeaves();
