const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password_hash: { type: String, required: true },
	role: { type: String, default: 'club_admin' },
	club_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
