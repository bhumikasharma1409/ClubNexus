const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
});

router.post('/', upload.single('poster'), eventController.createEvent);
router.get('/details/:id', eventController.getEventById);
router.get('/:clubId', eventController.getEvents);
router.put('/:id', upload.single('poster'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/:id/registrations', eventController.getEventRegistrations);
router.patch('/:id/toggle-dl', eventController.toggleDutyLeave);

module.exports = router;
