require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const clubRoutes = require('./src/routes/clubRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// serve uploaded posters
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/clubs', clubRoutes);

// health
app.get('/', (req, res) => res.send('ClubNexus backend running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
