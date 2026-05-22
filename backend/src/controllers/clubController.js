// src/controllers/clubController.js
const { Club } = require('../models');

exports.createClub = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Club name required' });

  const exists = await Club.findOne({ where: { name } });
  if (exists) return res.status(409).json({ message: 'Club already exists' });

  const club = await Club.create({ name, description });
  res.status(201).json(club);
};

exports.getClubs = async (req, res) => {
  const clubs = await Club.findAll();
  res.json(clubs);
};
