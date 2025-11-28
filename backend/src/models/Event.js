const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String,
  venue: String,
  posterUrl: String, // path to uploaded file or remote URL
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
