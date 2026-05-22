const { Application, Club } = require('../models');

// Submit a new application
exports.submitApplication = async (req, res) => {
    try {
        const { name, rollNo, email, year, contactNumber, position, clubId } = req.body;

        // Validate required fields
        if (!name || !rollNo || !email || !year || !contactNumber || !position || !clubId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Verify club exists
        const club = await Club.findByPk(clubId);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Check if already applied for this position in this club
        const existingApplication = await Application.findOne({ where: { rollNo, clubId, position } });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this position' });
        }

        const newApplication = await Application.create({
            name,
            rollNo,
            email,
            year,
            contactNumber,
            position,
            clubId
        });

        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all applications for a specific club
exports.getApplications = async (req, res) => {
    try {
        const { clubId } = req.params;

        const applications = await Application.findAll({
            where: { clubId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
