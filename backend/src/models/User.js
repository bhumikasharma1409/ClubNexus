const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional if social etc.
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }, // user can be member of a club (optional)
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  role: { type: String, enum: ['user','admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
