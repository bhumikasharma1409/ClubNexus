const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in env');

  // NEW MONGOOSE v7+ CONNECTION (no options required)
  await mongoose.connect(uri);

  console.log('MongoDB connected');
};

module.exports = connectDB;

