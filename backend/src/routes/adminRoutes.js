const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const { auth, requireAdmin } = require('../middlewares/authMiddleware');
const upload = require('../utils/multer');
const { createEvent, updateEvent, deleteEvent, publishEvent, dashboardStats } = require('../controllers/eventController');

router.post('/login', adminLogin);

// protected admin actions
router.use(auth); // will populate req.admin or req.user
router.post('/events', requireAdmin, upload.single('poster'), createEvent);
router.put('/events/:id', requireAdmin, upload.single('poster'), updateEvent);
router.delete('/events/:id', requireAdmin, deleteEvent);
router.post('/events/:id/publish', requireAdmin, publishEvent);
router.get('/dashboard', requireAdmin, dashboardStats);

module.exports = router;
