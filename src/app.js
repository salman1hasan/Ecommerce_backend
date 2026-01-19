// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ======================
// Test / Health route
// ======================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// ======================
// Routes
// ======================

// Products routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Orders routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Protected routes (JWT middleware can be added later)
//const protectedRoutes = require('./routes/protectedRoutes');
//app.use('/api/protected', protectedRoutes);

// ======================
// Error handling middleware
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
