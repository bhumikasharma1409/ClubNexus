const { User, Event, Activity, Registration, Club } = require('../models');

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id; // From auth middleware
    console.log('Registering user:', userId, 'for event:', eventId);
    console.log('Form data:', req.body);

    const { name, rollNo, department, year, email, phone, groupName } = req.body;

    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if already registered (check Registration table)
    const existingRegistration = await Registration.findOne({ where: { userId, eventId } });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    // Create Registration
    const registration = await Registration.create({
      userId,
      eventId,
      name,
      rollNo,
      department,
      year,
      email,
      phone,
      groupName
    });

    // Add user to event attendees (many-to-many relationship)
    // This populates the UserEvents join table
    await event.addUser(user);

    // Log Activity
    await Activity.create({
      action: 'Event Registration',
      details: `${user.name} registered for ${event.title}`,
      clubId: event.clubId
    });

    res.json({ message: 'Successfully registered for event', event });
  } catch (err) {
    console.error('Registration Error:', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      include: [{
        model: Event,
        include: [Club] // Populate club details inside event
      }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.Events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
