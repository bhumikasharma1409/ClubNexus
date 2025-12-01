const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    rollNo: { type: String },
    position: { type: String, default: 'member' } // 'head' or 'member'
});

const teamSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        default: '#EF4444' // Default red
    },
    members: [memberSchema]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
