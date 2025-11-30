const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    groupName: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Compound index to prevent duplicate registrations for the same event by the same user
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
