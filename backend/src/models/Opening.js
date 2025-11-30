const mongoose = require('mongoose');

const openingSchema = new mongoose.Schema({
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true,
        unique: true // One opening config per club
    },
    technicalRoles: [{
        type: String
    }],
    nonTechnicalRoles: [{
        type: String
    }],
    poster: {
        type: String // Path to uploaded image
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Opening', openingSchema);
