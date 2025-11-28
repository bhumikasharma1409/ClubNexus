const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { signToken } = require('../utils/jwt');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).populate('club');
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({ id: admin._id, type: 'admin' });
    return res.json({ token, admin: { id: admin._id, name: admin.name, club: admin.club }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { adminLogin };
