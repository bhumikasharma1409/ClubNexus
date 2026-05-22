const { Sequelize, DataTypes } = require('sequelize');
const { connectDB, sequelize } = require('./src/config/sequelize');
const EventModel = require('./src/models/Event');

(async () => {
    try {
        await connectDB();
        const Event = EventModel(sequelize, DataTypes);

        console.log("Testing Date format '15/12/2025'...");

        try {
            const event = await Event.create({
                title: "Test Event",
                description: "Test Desc",
                date: "15/12/2025", // Incorrect format
                time: "10:00 AM",
                place: "Venue",
                clubId: 1 // Assuming club 1 exists (Open Source)
            });
            console.log("Event created:", event.toJSON());
        } catch (e) {
            console.error("Create failed as expected:", e.message);
        }

        console.log("\nTesting Date format '2025-12-15'...");
        try {
            const event2 = await Event.create({
                title: "Test Event 2",
                description: "Test Desc",
                date: "2025-12-15", // Correct format
                time: "10:00 AM",
                place: "Venue",
                clubId: 1
            });
            console.log("Event created:", event2.toJSON());
        } catch (e) {
            console.error("Create 2 failed:", e.message);
        }

        process.exit(0);

    } catch (err) {
        console.error("Setup error:", err);
        process.exit(1);
    }
})();
