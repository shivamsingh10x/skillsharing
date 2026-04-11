require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const app = express();

// ── DB Connection ─────────────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected');
    }
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://shivamsingh10x.github.io',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
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
  res.json({ status: 'ok', message: 'SkillSphere API running', timestamp: new Date() });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', require('../backend/routes/authRoutes'));
app.use('/api/courses', require('../backend/routes/courseRoutes'));
app.use('/api/reviews', require('../backend/routes/reviewRoutes'));
app.use('/api/certificates', require('../backend/routes/certificateRoutes'));
app.use('/api/notifications', require('../backend/routes/notificationRoutes'));
app.use('/api/wishlist', require('../backend/routes/wishlistRoutes'));
app.use('/api/analytics', require('../backend/routes/analyticsRoutes'));

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));

// ── Error handler ─────────────────────────────────────────────────────────────
const errorHandler = require('../backend/middleware/errorHandler');
app.use(errorHandler);

// ── Export for Vercel ─────────────────────────────────────────────────────────
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
