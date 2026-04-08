const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// Get all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed tables if empty
router.post('/seed', async (req, res) => {
    try {
        const count = await Table.countDocuments();
        if(count > 0) return res.json({ message: 'Tables already seeded' });
        
        const tables = [];
        for(let i=1; i<=10; i++){
            tables.push({
                tableNumber: i,
                capacity: i % 2 === 0 ? 4 : 2,
                status: 'available'
            })
        }
        await Table.insertMany(tables);
        res.json({ message: 'Tables created securely.'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update table status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const table = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        req.io.emit('tableStatusUpdated', table);
        res.json(table);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
