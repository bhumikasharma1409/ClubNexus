const mongoose = require('mongoose');

const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
    console.log('Using fallback Atlas URI');
    uri = 'mongodb+srv://Bhanvi:Atlas%230302@cluster0.elci9ii.mongodb.net/?appName=Cluster0';
  }

  if (!uri) throw new Error('MONGO_URI not set in env');

  // NEW MONGOOSE v7+ CONNECTION (no options required)
  await mongoose.connect(uri);

  console.log('MongoDB connected');
};

module.exports = connectDB;

