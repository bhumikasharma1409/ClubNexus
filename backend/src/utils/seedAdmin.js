// src/utils/seedAdmin.js
require('dotenv').config();
const { connectDB } = require('../config/sequelize');
const { User, Club } = require('../models');
const bcrypt = require('bcryptjs');

const run = async () => {
  try {
    await connectDB();
    const adminEmail = 'bhanvisahni@gmail.com';
    const salt = parseInt(process.env.BCRYPT_SALT || '10');
    const hashed = await bcrypt.hash('bhanvi', salt);

    const [club] = await Club.findOrCreate({
      where: { name: 'Open Source' },
      defaults: {
        description: 'Contribute to real-world projects and collaborate globally.'
      }
    });

    const [admin, created] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Bhanvi',
        password: hashed,
        role: 'admin',
        clubId: club.id
      }
    });

    if (!created) {
      admin.name = 'Bhanvi';
      admin.password = hashed;
      admin.role = 'admin';
      admin.clubId = club.id;
      await admin.save();
    }

    console.log('Admin created/updated:', adminEmail, 'for club:', club.name);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
