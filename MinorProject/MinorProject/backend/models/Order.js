const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tableNumber: { type: Number, required: true },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: { type: Number, required: true },
    notes: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['received', 'preparing', 'ready', 'delivered'], default: 'received' },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  paymentMethod: { type: String, enum: ['upi', 'card', 'cash'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
