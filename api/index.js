require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const app = express();

// ── DB Connection (cached for Vercel serverless) ──────────────────────────────
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    isConnected = false;
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

// ── Ensure DB connected before every request (CRITICAL for Vercel) ────────────
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    return res.status(503).json({ success: false, message: 'Database connection failed. Please try again.' });
  }
});

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://shivamsingh10x.github.io',
  'https://skill-sharing-shivam.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
}));

app.use('/api/auth/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
}));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'SkillSphere API running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────
const backendPath = path.join(__dirname, '..', 'backend');
app.use('/api/auth',          require(path.join(backendPath, 'routes', 'authRoutes')));
app.use('/api/courses',       require(path.join(backendPath, 'routes', 'courseRoutes')));
app.use('/api/reviews',       require(path.join(backendPath, 'routes', 'reviewRoutes')));
app.use('/api/certificates',  require(path.join(backendPath, 'routes', 'certificateRoutes')));
app.use('/api/notifications', require(path.join(backendPath, 'routes', 'notificationRoutes')));
app.use('/api/wishlist',      require(path.join(backendPath, 'routes', 'wishlistRoutes')));
app.use('/api/analytics',     require(path.join(backendPath, 'routes', 'analyticsRoutes')));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

// ── Error handler ─────────────────────────────────────────────────────────────
const errorHandler = require(path.join(backendPath, 'middleware', 'errorHandler'));
app.use(errorHandler);

// ── Export for Vercel ─────────────────────────────────────────────────────────
module.exports = app;
