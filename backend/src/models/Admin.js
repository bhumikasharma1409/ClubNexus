const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
