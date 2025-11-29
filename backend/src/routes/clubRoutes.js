// src/routes/clubRoutes.js
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { protect, authorize } = require('../middleware/authMiddleware');

// anyone can view clubs
router.get('/', clubController.getClubs);

// create club only admin
router.post('/', protect, authorize('admin'), clubController.createClub);

module.exports = router;
