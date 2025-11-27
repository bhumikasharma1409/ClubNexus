const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	starts_at: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
