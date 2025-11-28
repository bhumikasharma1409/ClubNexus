const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // allow both user and admin
    if (decoded.type === 'admin') {
      req.admin = await Admin.findById(decoded.id).populate('club');
    } else {
      req.user = await User.findById(decoded.id).populate('club');
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// admin guard
const requireAdmin = (req, res, next) => {
  if (!req.admin) return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = { auth, requireAdmin };
