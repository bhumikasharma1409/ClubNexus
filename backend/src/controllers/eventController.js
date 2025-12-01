const Event = require('../models/Event');
const Activity = require('../models/Activity');
const Registration = require('../models/Registration');
const fs = require('fs');
const path = require('path');

exports.getEventRegistrations = async (req, res) => {
    try {
        const { id } = req.params;
        const registrations = await Registration.find({ event: id });
        res.json(registrations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching event details for ID:', id);
        const event = await Event.findById(id).populate('club');
        if (!event) {
            console.log('Event not found in DB');
            return res.status(404).json({ message: 'Event not found' });
        }
        console.log('Event found:', event.title);
        res.json(event);
    } catch (err) {
        console.error('Error fetching event details:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, time, place, club } = req.body;

        // Check if file was uploaded
        let posterPath = '';
        if (req.file) {
            posterPath = '/uploads/' + req.file.filename;
        }

        if (!title || !description || !date || !time || !place || !club) {
            // If file uploaded but validation fails, delete it
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'All fields are required' });
        }

        const event = new Event({
            title,
            description,
            date,
            time,
            place,
            poster: posterPath,
            club
        });

        await event.save();

        // Log Activity
        await Activity.create({
            action: 'Event Created',
            details: `Created event: ${title}`,
            club: club
        });

        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        console.error(err);
        if (req.file) fs.unlinkSync(req.file.path); // Cleanup on error
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { clubId } = req.params;
        const events = await Event.find({ club: clubId }).sort({ date: 1 });
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Delete poster file if exists
        if (event.poster) {
            const filePath = path.join(__dirname, '../../', event.poster);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Event.findByIdAndDelete(id);

        // Log Activity
        await Activity.create({
            action: 'Event Deleted',
            details: `Deleted event: ${event.title}`,
            club: event.club
        });

        res.json({ message: 'Event deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, place } = req.body;

        let event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Handle new poster upload
        if (req.file) {
            // Delete old poster
            if (event.poster) {
                const oldPath = path.join(__dirname, '../../', event.poster);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            event.poster = '/uploads/' + req.file.filename;
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.time = time || event.time;
        event.place = place || event.place;

        await event.save();

        // Log Activity
        await Activity.create({
            action: 'Event Updated',
            details: `Updated event: ${event.title}`,
            club: event.club
        });

        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
