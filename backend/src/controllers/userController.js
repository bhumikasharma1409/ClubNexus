// src/controllers/userController.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).select('-password').populate('club', 'name description');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  // admin only route (ensure middleware)
  const users = await User.find().select('-password').populate('club', 'name');
  res.json(users);
};
