const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/:clubId', teamController.getTeams);
router.post('/', teamController.createTeam);
router.put('/:teamId', teamController.updateTeam);
router.delete('/:teamId', teamController.deleteTeam);
router.post('/:teamId/members', teamController.addMember);
router.post('/:teamId/members/bulk', teamController.addMembers);
router.delete('/:teamId/members/:memberId', teamController.removeMember);

module.exports = router;
