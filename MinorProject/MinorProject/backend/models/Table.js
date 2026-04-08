const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  status: { type: String, enum: ['available', 'occupied', 'reserved'], default: 'available' },
  qrCodeUrl: { type: String }, // Virtual URL for the QR code
  currentSession: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Link to current active order if occupied
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Table', tableSchema);
