const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed Initial Data (Temporary route just to populate demo data)
router.post('/seed', async (req, res) => {
  try {
    const count = await MenuItem.countDocuments();
    if(count > 0) return res.json({ message: 'Menu already seeded' });

    const sampleMenu = [
      { name: 'Spicy Veggie Pizza', description: 'Loaded with bell peppers, olives, and jalapenos', price: 12.99, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
      { name: 'Creamy Mushroom Pasta', description: 'Penne pasta in a rich garlic mushroom sauce', price: 14.50, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a' },
      { name: 'Crispy Calamari', description: 'Golden fried calamari rings with tartar sauce', price: 8.99, category: 'Starters', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
      { name: 'Mango Tango Mocktail', description: 'Refreshing mango and citrus cooler', price: 5.50, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813' },
      { name: 'Truffle Fries', description: 'Shoestring fries tossed in truffle oil and parmesan', price: 6.99, category: 'Starters', imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4' },
      { name: 'Classic Tiramisu', description: 'Espresso soaked ladyfingers with mascarpone', price: 7.50, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1571115177098-24de8c65bb31' }
    ];
    await MenuItem.insertMany(sampleMenu);
    res.json({ message: 'Menu seeded successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
