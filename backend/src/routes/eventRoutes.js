const express = require("express");
const { getEvents, addEvent } = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getEvents);
router.post("/", authMiddleware, addEvent);

module.exports = router;

