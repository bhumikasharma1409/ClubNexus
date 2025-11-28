const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.model('Club', ClubSchema);
