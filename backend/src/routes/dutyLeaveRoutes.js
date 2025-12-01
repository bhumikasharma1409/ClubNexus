const express = require('express');
const router = express.Router();
const dutyLeaveController = require('../controllers/dutyLeaveController');

// Check status
router.get('/status', dutyLeaveController.checkStatus);

// Get all DLs for a club
router.get('/:clubId', dutyLeaveController.getDutyLeaves);

// Update status
router.put('/:id/status', dutyLeaveController.updateStatus);

// Create DL (for testing)
router.post('/', dutyLeaveController.createDutyLeave);

module.exports = router;
