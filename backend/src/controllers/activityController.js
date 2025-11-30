const Activity = require('../models/Activity');

exports.getRecentActivity = async (req, res) => {
    try {
        const { clubId } = req.params;
        const activities = await Activity.find({ club: clubId })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
