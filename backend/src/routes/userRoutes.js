const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register for an event
router.post('/events/:eventId/register', authMiddleware.protect, userController.registerForEvent);

// Get user's registered events
router.get('/events', authMiddleware.protect, userController.getUserEvents);

module.exports = router;
