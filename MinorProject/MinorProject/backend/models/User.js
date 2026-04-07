const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'chef', 'admin', 'reception'], default: 'customer' },
  phone: { type: String },
  loyaltyPoints: { type: Number, default: 0 }, // 8 points = 1 free item
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
