const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OTP = require('../models/OTP');

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// Register email
router.post('/register/email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
    await user.save();
  }
  res.json({ success: true, email: user.email });
});

// Save password route
router.post("/profile/password", async (req, res) => {
  const { password } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password saved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await OTP.findOneAndDelete({ email }); // delete old OTP
  const otp = new OTP({ email, code, expiresAt });
  await otp.save();

  console.log(`OTP for ${email}: ${code}`); // in real app, send email

  res.json({ success: true, message: "OTP sent" });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;
  const otp = await OTP.findOne({ email, code });

  if (!otp) return res.status(400).json({ error: "Invalid OTP" });
  if (otp.expiresAt < new Date()) return res.status(400).json({ error: "OTP expired" });

  const user = await User.findOne({ email });
  user.isVerified = true;
  await user.save();

  await OTP.deleteOne({ _id: otp._id });
  res.json({ success: true, message: "Email verified" });
});

// Save name data
router.post("/name", async (req, res) => {
  try {
    const { userId, firstName, lastName } = req.body;

    if (!userId || !firstName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update user record
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true } // return updated document
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Name saved successfully", user });
  } catch (err) {
    console.error("Save name error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
