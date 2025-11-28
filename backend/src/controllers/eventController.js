const Event = require('../models/Event');

// create event (admin only). poster file available at req.file
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue } = req.body;
    const posterUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const event = new Event({
      title, description, date, time, venue,
      posterUrl,
      club: req.admin.club._id,
      createdBy: req.admin._id,
      status: 'draft'
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // ensure same club
    if (event.club.toString() !== req.admin.club._id.toString()) return res.status(403).json({ message: 'Forbidden' });

    const { title, description, date, time, venue } = req.body;
    if (req.file) event.posterUrl = `/uploads/${req.file.filename}`;
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (time) event.time = time;
    if (venue) event.venue = venue;
    await event.save();
    res.json(event);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure same club
    if (event.club.toString() !== req.admin.club._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const publishEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.club.toString() !== req.admin.club._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    event.status = 'published';
    await event.save();
    res.json(event);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

// list events for a specific club for the frontend, split upcoming and past based on date
const listEventsForClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const now = new Date();
    const upcoming = await Event.find({ club: clubId, date: { $gte: now } }).sort({ date: 1 });
    const past = await Event.find({ club: clubId, date: { $lt: now } }).sort({ date: -1 });
    res.json({ upcoming, past });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

// admin dashboard summary (counts)
const dashboardStats = async (req, res) => {
  try {
    const clubId = req.admin.club._id;
    const eventsCount = await Event.countDocuments({ club: clubId });
    const publishedCount = await Event.countDocuments({ club: clubId, status: 'published' });
    const draftCount = await Event.countDocuments({ club: clubId, status: 'draft' });
    // optionally count members/users in that club
    const User = require('../models/User');
    const memberCount = await User.countDocuments({ club: clubId });
    res.json({ eventsCount, publishedCount, draftCount, memberCount });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

module.exports = { createEvent, updateEvent, deleteEvent, publishEvent, listEventsForClub, dashboardStats };
