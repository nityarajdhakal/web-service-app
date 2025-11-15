const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const apiRoutes = require("./routes/api");
const pool = require("./config/db");

const app = express();

// Security + performance middleware
app.use(helmet());
app.use(compression());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - configure via env in production
const corsOptions = {
  origin: function (origin, callback) {
    // Allowed origins - always includes localhost for dev and configured origin for prod
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173', // Vite dev server
      'http://localhost:5000',
      'http://localhost',
      'https://web-service-application.onrender.com',
      process.env.CORS_ORIGIN
    ].filter(Boolean);

    // In production, be stricter
    if (process.env.NODE_ENV === 'production') {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked in production: ${origin}`);
        callback(new Error('CORS not allowed in production'));
      }
    } else {
      // Development: allow all
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600 // Cache preflight requests for 1 hour
};
app.use(cors(corsOptions));

// Logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  console.log('🚀 Running in PRODUCTION mode');
} else {
  app.use(morgan("dev"));
  console.log('🔧 Running in DEVELOPMENT mode');
}

// Rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || "120", 10),
});
app.use(limiter);

// Database connection (log only)
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

// API routes FIRST so /api/* are handled before static files
app.use("/api", apiRoutes);

// Handle API 404s
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: `API route ${req.method} ${req.path} not found` });
});

// Serve frontend build if available
const buildPathEnv = process.env.FRONTEND_DIST_PATH;
const defaultBuildPath = path.join(__dirname, "..", "miniapp-frontend", "dist");
const buildPath = buildPathEnv ? path.resolve(buildPathEnv) : defaultBuildPath;

console.log("Frontend build path:", buildPath);
console.log("Frontend build exists:", fs.existsSync(buildPath));

if (fs.existsSync(buildPath)) {
  // Serve static files from frontend build
  app.use(express.static(buildPath, { 
    maxAge: '1h', 
    etag: false 
  }));

  // Catch-all: serve index.html for client-side routing
  // This must come AFTER express.static() and AFTER API routes
  app.get("*", (req, res) => {
    const indexPath = path.join(buildPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Error serving index.html:", err);
        res.status(500).json({ success: false, message: "Error serving frontend" });
      }
    });
  });
} else {
  // Frontend not built — respond with helpful message
  console.error("Frontend build not found at:", buildPath);
  app.get("*", (req, res) => {
    res.status(503).json({ 
      success: false, 
      message: `Frontend not found at ${buildPath}. Build the frontend and deploy it.` 
    });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

module.exports = app;

