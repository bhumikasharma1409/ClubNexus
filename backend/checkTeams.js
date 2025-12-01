const mongoose = require('mongoose');
const Team = require('./src/models/Team');
require('dotenv').config();

const checkTeams = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const teams = await Team.find({});
        console.log("Teams found:", teams.length);
        teams.forEach(t => {
            console.log(`Team: ${t.name}`);
            console.log("Members:", JSON.stringify(t.members, null, 2));
        });
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

checkTeams();
