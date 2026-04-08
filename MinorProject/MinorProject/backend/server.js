require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { MongoMemoryServer } = require('mongodb-memory-server');
const MenuItem = require('./models/MenuItem');
const Table = require('./models/Table');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const tableRoutes = require('./routes/tables');
const statRoutes = require('./routes/stats');
const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/bookings', bookingRoutes);

// Socket.io for Real-Time Order status
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Attach socket io to requests so it can be used in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/serveease';

let mongoMemoryServer;

async function seedInitialData() {
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany([
      { name: 'Spicy Veggie Pizza', description: 'Loaded with bell peppers, olives, and jalapenos', price: 12.99, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
      { name: 'Creamy Mushroom Pasta', description: 'Penne pasta in a rich garlic mushroom sauce', price: 14.50, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a' },
      { name: 'Crispy Calamari', description: 'Golden fried calamari rings with tartar sauce', price: 8.99, category: 'Starters', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d' },
      { name: 'Mango Tango Mocktail', description: 'Refreshing mango and citrus cooler', price: 5.50, category: 'Beverages', imageUrl: 'https://images.unsplash.com/photo-1536935338788-846bb9981813' },
      { name: 'Truffle Fries', description: 'Shoestring fries tossed in truffle oil and parmesan', price: 6.99, category: 'Starters', imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4' },
      { name: 'Classic Tiramisu', description: 'Espresso soaked ladyfingers with mascarpone', price: 7.50, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1571115177098-24de8c65bb31' }
    ]);
    console.log('Seeded menu items');
  }

  const tableCount = await Table.countDocuments();
  if (tableCount === 0) {
    const tables = [];
    for (let i = 1; i <= 10; i += 1) {
      tables.push({
        tableNumber: i,
        capacity: i % 2 === 0 ? 4 : 2,
        status: 'available'
      });
    }
    await Table.insertMany(tables);
    console.log('Seeded tables');
  }
}

async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Database');
  } catch (error) {
    console.warn('MongoDB not reachable, starting in-memory MongoDB fallback...');
    mongoMemoryServer = await MongoMemoryServer.create({ instance: { dbName: 'serveease' } });
    const memoryUri = mongoMemoryServer.getUri();
    await mongoose.connect(memoryUri);
    console.log('Connected to in-memory MongoDB Database');
  }
}

async function start() {
  try {
    await connectDatabase();
    await seedInitialData();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
}

async function shutdown() {
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
}

process.on('SIGINT', async () => {
  await shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdown();
  process.exit(0);
});

start();
