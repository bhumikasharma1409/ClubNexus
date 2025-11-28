const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { sendOTPEmail } = require('../utils/mailer');
const { signToken } = require('../utils/jwt');

const signup = async (req, res) => {
  const { name, email, password, clubId } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const hashed = password ? await bcrypt.hash(password, 10) : undefined;
    // create but unverified
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10*60*1000); // 10 minutes

    user = new User({ name, email, password: hashed, club: clubId, isVerified: false, otp, otpExpires });
    await user.save();

    // send OTP
    await sendOTPEmail({ to: email, otp });
    return res.status(201).json({ message: 'User created. OTP sent to email.'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (user.isVerified) return res.status(400).json({ message: 'Already verified' });
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = signToken({ id: user._id, type: 'user' });
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify email first' });

    // If you used passwords:
    if (password) {
      const match = await bcrypt.compare(password, user.password || '');
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: user._id, type: 'user' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, verifyOtp, login };
