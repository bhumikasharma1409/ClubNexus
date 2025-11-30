const User = require('../models/User');
const Event = require('../models/Event');
const Activity = require('../models/Activity');

const Registration = require('../models/Registration');

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id; // From auth middleware
    console.log('Registering user:', userId, 'for event:', eventId);
    console.log('Form data:', req.body);

    const { name, rollNo, department, year, email, phone, groupName } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already registered (check Registration collection)
    const existingRegistration = await Registration.findOne({ user: userId, event: eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Create Registration
    const registration = new Registration({
      user: userId,
      event: eventId,
      name,
      rollNo,
      department,
      year,
      email,
      phone,
      groupName
    });
    await registration.save();

    // Add user to event attendees (if not already there)
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    // Add event to user registeredEvents (if not already there)
    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }

    // Log Activity
    await Activity.create({
      action: 'Event Registration',
      details: `${user.name} registered for ${event.title}`,
      club: event.club
    });

    res.json({ message: 'Successfully registered for event', event });
  } catch (err) {
    console.error('Registration Error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: 'registeredEvents',
      populate: { path: 'club', select: 'name' } // Populate club details inside event
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.registeredEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
