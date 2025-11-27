
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/events", require("./src/routes/eventRoutes"));

app.get("/", (req, res) => {
  res.send("Backend running...");
});

const PORT = process.env.PORT || 5001;
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log("Server running on port " + PORT));
});



