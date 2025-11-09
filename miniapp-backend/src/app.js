const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", apiRoutes);

// Welcome Route
app.get("/", (req, res) => {
  res.send("Mini-App Backend is running!");
});

module.exports = app;

