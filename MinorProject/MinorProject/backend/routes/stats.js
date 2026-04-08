const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// simple analytics
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);

    const ordersToday = await Order.countDocuments({ createdAt: { $gte: today } });
    
    // Sum total revenue today
    const revenueAgg = await Order.aggregate([
        { $match: { createdAt: { $gte: today }, paymentStatus: 'completed' }},
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const revenueToday = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.json({
        ordersToday,
        revenueToday,
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
