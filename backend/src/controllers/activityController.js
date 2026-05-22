const { Activity } = require('../models');

exports.getRecentActivity = async (req, res) => {
    try {
        const { clubId } = req.params;
        const activities = await Activity.findAll({
            where: { clubId },
            order: [['createdAt', 'DESC']],
            limit: 10
        });
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
