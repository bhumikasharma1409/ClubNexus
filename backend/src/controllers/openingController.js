const Opening = require('../models/Opening');
const fs = require('fs');
const path = require('path');

exports.createOrUpdateOpening = async (req, res) => {
    try {
        const { clubId, technicalRoles, nonTechnicalRoles } = req.body;

        if (!clubId) {
            return res.status(400).json({ message: 'Club ID is required' });
        }

        // Parse roles if they come as JSON strings (from FormData)
        let techRoles = [];
        let nonTechRoles = [];

        try {
            techRoles = JSON.parse(technicalRoles || '[]');
            nonTechRoles = JSON.parse(nonTechnicalRoles || '[]');
        } catch (e) {
            return res.status(400).json({ message: 'Invalid roles format' });
        }

        let posterPath = '';
        if (req.file) {
            posterPath = '/uploads/' + req.file.filename;
        }

        let opening = await Opening.findOne({ club: clubId });

        if (opening) {
            // Update existing
            opening.technicalRoles = techRoles;
            opening.nonTechnicalRoles = nonTechRoles;
            if (posterPath) {
                // Delete old poster if exists
                if (opening.poster) {
                    const oldPath = path.join(__dirname, '../../', opening.poster);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                opening.poster = posterPath;
            }
            await opening.save();
        } else {
            // Create new
            opening = new Opening({
                club: clubId,
                technicalRoles: techRoles,
                nonTechnicalRoles: nonTechRoles,
                poster: posterPath
            });
            await opening.save();
        }

        res.status(200).json({ message: 'Openings updated successfully', opening });

    } catch (err) {
        console.error("Error in createOrUpdateOpening:", err);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getOpening = async (req, res) => {
    try {
        const { clubId } = req.params;
        const opening = await Opening.findOne({ club: clubId });
        res.json(opening || { technicalRoles: [], nonTechnicalRoles: [], poster: '' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
