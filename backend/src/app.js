// src/app.js
require('express-async-errors'); // to catch async errors without try/catch in routes
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // optional but good
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Keep this as it's used in the original but not explicitly in the instruction's snippet for routes
const clubRoutes = require('./routes/clubRoutes');
const activityRoutes = require('./routes/activityRoutes');
const openingRoutes = require('./routes/openingRoutes');
const teamRoutes = require('./routes/teamRoutes');
const chatRoutes = require('./routes/chatRoutes');
const path = require('path');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow loading images from uploads
}));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route
app.get('/', (req, res) => res.json({ message: 'ClubNexus API is alive' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/openings', openingRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/chat', chatRoutes);

// Error handler (should be last)
app.use(errorMiddleware);

module.exports = app;
