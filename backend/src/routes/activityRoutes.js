const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/:clubId', activityController.getRecentActivity);

module.exports = router;
