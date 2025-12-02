const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// POST /api/applications/submit
router.post('/submit', applicationController.submitApplication);

// GET /api/applications/:clubId
router.get('/:clubId', applicationController.getApplications);

module.exports = router;
