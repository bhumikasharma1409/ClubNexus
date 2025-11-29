// src/app.js
require('express-async-errors'); // to catch async errors without try/catch in routes
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // optional but good
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Global middlewares
app.use(express.json());
app.use(cors());
app.use(helmet && helmet()); // if helmet installed; optional

// Basic route
app.get('/', (req, res) => res.json({ message: 'ClubNexus API is alive' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);

// Error handler (should be last)
app.use(errorMiddleware);

module.exports = app;
