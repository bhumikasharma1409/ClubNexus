// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// profile for logged in user
router.get('/me', protect, userController.getProfile);

// admin-only route to list users
router.get('/', protect, authorize('admin'), userController.getAllUsers);

module.exports = router;
