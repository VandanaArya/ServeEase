const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { customerId, tableNumber, items, totalAmount, paymentMethod } = req.body;
    
    const newOrder = new Order({
      customer: customerId,
      tableNumber,
      items,
      totalAmount,
      paymentMethod
    });

    const savedOrder = await newOrder.save();

    // Reward Loyalty Points if customer ID provided
    if (customerId) {
        let user = await User.findById(customerId);
        if(user) {
            user.loyaltyPoints += 1;
            // 8 points -> reset logic could happen in frontend or here later
            if (user.loyaltyPoints > 8) user.loyaltyPoints = 1;
            await user.save();
        }
    }

    // Emit socket event to chef and admin
    req.io.emit('newOrder', savedOrder);

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (Admin/Chef)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem').populate('customer', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders by table or customer
router.get('/my-orders/:userId', async (req, res) => {
    try {
      const orders = await Order.find({ customer: req.params.userId }).populate('items.menuItem').sort({ createdAt: -1 });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Update order status (Chef: received -> preparing -> ready)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    // Notify customer
    req.io.emit('orderStatusUpdated', order);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
