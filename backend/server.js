const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
require('dotenv').config();

// Models
const User = require('./models/User');
const Profile = require('./models/Profile');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// ===== ROUTES =====


// Base
app.get('/', (req, res) => res.send('API running'));

// ===== REGISTER =====
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim() // plaintext, will hash automatically in pre-save
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== LOGIN =====
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const bcrypt = require('bcryptjs'); // make sure bcrypt is imported
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== PROTECTED PROFILE =====
app.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ===== SEND OTP =====
app.post('/sendOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  user.otp = otp;
  await user.save();

  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: 'OTP sent', otp }); // send OTP in response for testing
});

// ===== CONFIRM SIGNUP =====
app.post('/confirmSignup', async (req, res) => {
  const { email, otpCode } = req.body;
  if (!email || !otpCode) return res.status(400).json({ error: 'Email and OTP required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.otp != otpCode) return res.status(401).json({ error: 'Invalid OTP' });

  user.otp = null;
  user.isVerified = true; // optional
  await user.save();

  res.json({ message: 'Signup confirmed' });
});
// ===== RESEND OTP =====
app.post('/resendOtp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.otp = otp;
  await user.save();

  console.log(`Resent OTP for ${email}: ${otp}`);
  res.json({ message: 'OTP resent', otp });
});



// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
