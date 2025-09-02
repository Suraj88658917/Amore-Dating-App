const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');


// Get profile of logged in user
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', '-password');
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error('Profile GET error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Save name
// POST /profile/name - save name for profile (used by your RN screen)
router.post('/name', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    // ensure user exists
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update or create profile
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      profile = new Profile({
        user: req.user.id,
        name: name.trim(),
        email: user.email
      });
    } else {
      profile.name = name.trim();
    }
    await profile.save();

    // Optionally keep User.name in sync
    user.name = name.trim();
    await user.save();

    res.json({ message: 'Name saved', profile });
  } catch (err) {
    console.error('POST /profile/name error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Save email
router.post('/email', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let profile = await Profile.findOne({ user: userId });
    if (!profile) profile = new Profile({ user: userId });

    profile.email = email;
    await profile.save();

    res.status(200).json({ message: 'Email saved', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save password during signup
router.post("/profile/password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email & password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ success: true, message: "Password saved" });
  } catch (err) {
    console.error("Error in /profile/password:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
