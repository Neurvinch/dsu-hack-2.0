// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');  // ✅ New import
const router = express.Router();

// Anon Aadhaar login for 'people'
router.post('/login-anon', async (req, res) => {
  const { nullifierHash, profile } = req.body;
  let user = await User.findOne({ nullifierHash });
  if (!user) {
    user = await User.create({ nullifierHash, role: 'people', profile });
  } else {
    user.profile = { ...user.profile, ...profile };
    await user.save();
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { role: user.role, profile: user.profile } });
});

// Department login
router.post('/login-dept', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { role: user.role } });
});

// GET profile
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ profile: user.profile });
});

// PUT update profile
router.put('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.profile = { ...user.profile, ...req.body };
  await user.save();
  res.json({ profile: user.profile });
});

module.exports = router;