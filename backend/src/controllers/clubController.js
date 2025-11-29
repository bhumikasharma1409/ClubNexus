// src/controllers/clubController.js
const Club = require('../models/Club');

exports.createClub = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Club name required' });

  const exists = await Club.findOne({ name });
  if (exists) return res.status(409).json({ message: 'Club already exists' });

  const club = new Club({ name, description });
  await club.save();
  res.status(201).json(club);
};

exports.getClubs = async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
};
