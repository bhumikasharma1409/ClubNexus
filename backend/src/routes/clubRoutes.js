const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const club = new Club({ name, description });
    await club.save();
    res.json(club);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

router.get('/', async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

module.exports = router;
