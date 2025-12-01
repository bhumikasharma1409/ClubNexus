const Team = require('../models/Team');

exports.getTeams = async (req, res) => {
    try {
        const { clubId } = req.params;
        const teams = await Team.find({ club: clubId });
        res.json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { clubId, name, color } = req.body;
        const team = new Team({ club: clubId, name, color, members: [] });
        await team.save();
        res.status(201).json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { name, color } = req.body;
        const team = await Team.findByIdAndUpdate(teamId, { name, color }, { new: true });
        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        await Team.findByIdAndDelete(teamId);
        res.json({ message: 'Team deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMember = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { name, phone, rollNo, position } = req.body;
        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        team.members.push({ name, phone, rollNo, position });
        await team.save();
        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeMember = async (req, res) => {
    try {
        const { teamId, memberId } = req.params;
        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        team.members = team.members.filter(m => m._id.toString() !== memberId);
        await team.save();
        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addMembers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { members } = req.body; // Expecting an array of member objects

        console.log(`[addMembers] Request for team ${teamId}`);
        console.log(`[addMembers] Payload:`, JSON.stringify(members));

        if (!Array.isArray(members)) {
            console.error('[addMembers] Error: members is not an array');
            return res.status(400).json({ message: 'Members must be an array' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            console.error('[addMembers] Error: Team not found');
            return res.status(404).json({ message: 'Team not found' });
        }

        // Append new members
        team.members.push(...members);
        await team.save();
        console.log(`[addMembers] Successfully added ${members.length} members`);
        res.json(team);
    } catch (err) {
        console.error('[addMembers] Exception:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
