const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/firebaseAuth');

// Login or register user via Firebase token
router.post('/login', verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = new User({ firebaseUid: req.user.uid, email: req.user.email, name: req.user.name });
      await user.save();
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
