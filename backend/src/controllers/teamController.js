const { Team } = require('../models');

exports.getTeams = async (req, res) => {
    try {
        const { clubId } = req.params;
        const teams = await Team.findAll({ where: { clubId } });
        res.json(teams);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { clubId, name, color } = req.body;
        const team = await Team.create({ clubId, name, color, members: [] });
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

        const team = await Team.findByPk(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        team.name = name;
        team.color = color;
        await team.save();

        res.json(team);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        await Team.destroy({ where: { id: teamId } });
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
        const team = await Team.findByPk(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const members = team.members || [];
        // Add a simple ID for frontend key usage, though not strictly necessary in JSON
        members.push({ id: Date.now().toString(), name, phone, rollNo, position });

        // We must re-assign to trigger update for JSON type in some Sequelize versions/dialects
        team.members = [...members];
        team.changed('members', true);
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
        const team = await Team.findByPk(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        let members = team.members || [];
        members = members.filter(m => m.id !== memberId);

        team.members = [...members];
        team.changed('members', true);
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

        const team = await Team.findByPk(teamId);
        if (!team) {
            console.error('[addMembers] Error: Team not found');
            return res.status(404).json({ message: 'Team not found' });
        }

        const currentMembers = team.members || [];
        const newMembers = members.map(m => ({ ...m, id: m.id || Date.now().toString() + Math.random() }));

        team.members = [...currentMembers, ...newMembers];
        team.changed('members', true);
        await team.save();

        console.log(`[addMembers] Successfully added ${members.length} members`);
        res.json(team);
    } catch (err) {
        console.error('[addMembers] Exception:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
