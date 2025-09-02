// models/Profile.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  city: String,
  lat: Number,
  lng: Number,
}, { _id: false });

const promptSchema = new mongoose.Schema({
  question: String,
  answer: String,
}, { _id: false });

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  name: { type: String },  
  email: { type: String },
  dob: Date,
  gender: String,
  type: String,
  datingIntent: String,
  lookingFor: [String],
  hometown: String,
  workplace: String,
  jobTitle: String,
  location: locationSchema,
  photos: [String],
  prompts: [promptSchema],
  completionStep: { type: Number, default: 0 },
  isComplete: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
