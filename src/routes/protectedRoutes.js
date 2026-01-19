const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/firebaseAuth');
const User = require('../models/user');

router.use(verifyToken);

// Get profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ firebaseUid: req.user.uid }, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin only: get all users
router.get('/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
