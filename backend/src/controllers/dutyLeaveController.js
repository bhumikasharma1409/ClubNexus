const DutyLeave = require('../models/DutyLeave');
const Club = require('../models/Club');

// Get all duty leaves for a club
exports.getDutyLeaves = async (req, res) => {
    try {
        const { clubId } = req.params;
        const dutyLeaves = await DutyLeave.find({ club: clubId }).sort({ createdAt: -1 });
        res.status(200).json(dutyLeaves);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching duty leaves', error: error.message });
    }
};

// Update status (Approve/Reject)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Approved' or 'Rejected'

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedDL = await DutyLeave.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedDL) {
            return res.status(404).json({ message: 'Duty leave request not found' });
        }

        res.status(200).json(updatedDL);
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error: error.message });
    }
};

// Create a duty leave request
exports.createDutyLeave = async (req, res) => {
    try {
        const { studentName, rollNo, eventName, date, clubId, userId, eventId } = req.body;
        console.log("Creating DL. User:", userId, "Event:", eventId, "Name:", studentName);

        // Check if already applied
        if (userId && eventId) {
            const existing = await DutyLeave.findOne({ user: userId, event: eventId });
            if (existing) {
                console.log("DL already exists for user/event");
                return res.status(400).json({ message: 'Already applied for duty leave for this event' });
            }
        }

        console.log("Creating new DL with ClubID:", clubId);
        const newDL = new DutyLeave({
            studentName,
            rollNo,
            eventName,
            date,
            club: clubId,
            user: userId,
            event: eventId
        });

        await newDL.save();
        console.log("DL Created Successfully:", newDL._id);
        res.status(201).json(newDL);
    } catch (error) {
        console.error("Error creating DL:", error);
        res.status(500).json({ message: 'Error creating duty leave', error: error.message });
    }
};

// Check status for a user and event
exports.checkStatus = async (req, res) => {
    try {
        const { userId, eventId } = req.query;
        console.log('Checking status for User:', userId, 'Event:', eventId);
        if (!userId || !eventId) {
            return res.status(400).json({ message: 'Missing userId or eventId' });
        }

        const dl = await DutyLeave.findOne({ user: userId, event: eventId });
        console.log('Found DL:', dl);
        if (!dl) {
            return res.json({ status: null });
        }
        res.json({ status: dl.status });
    } catch (error) {
        console.error('Error checking status:', error);
        res.status(500).json({ message: 'Error checking status', error: error.message });
    }
};
