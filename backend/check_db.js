const { connectDB } = require('./src/config/sequelize');
const { User, Club } = require('./src/models');
require('dotenv').config();

const run = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        const admin = await User.findOne({
            where: { email: 'bhanvisahni@gmail.com' },
            include: [Club]
        });
        console.log('Admin User:', admin ? admin.toJSON() : 'Not found');

        if (admin && admin.Club) {
            console.log('Linked Club:', admin.Club.toJSON());
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
