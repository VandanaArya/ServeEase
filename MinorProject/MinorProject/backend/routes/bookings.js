const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Table = require('../models/Table');

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { customerId, tableNumber, date, time, guests } = req.body;
    
    // Check if table exists
    const table = await Table.findOne({ tableNumber });
    if (!table) return res.status(404).json({ message: 'Table not found' });
    
    // Simplistic check for conflicting time could be added here
    
    const newBooking = new Booking({
      customer: customerId,
      tableNumber,
      date,
      time,
      guests
    });

    const savedBooking = await newBooking.save();
    
    // Update real time to admin
    req.io.emit('newBooking', savedBooking);

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin view all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customer', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
