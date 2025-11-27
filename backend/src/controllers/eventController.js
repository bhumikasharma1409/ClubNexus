const mongoose = require("../config/db");
const Event = require("../models/eventModel");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

exports.addEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = new Event({
      title,
      description,
      starts_at: date,
    });
    await event.save();
    res.json({ message: "Event created" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
};
