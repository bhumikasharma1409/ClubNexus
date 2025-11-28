const express = require('express');
const router = express.Router();
const { listEventsForClub } = require('../controllers/eventController');

router.get('/club/:clubId', listEventsForClub);

module.exports = router;
