const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/branches', require('./routes/branchRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/message', require('./routes/messageRoutes'));
app.use('/api/banner', require('./routes/bannerRoutes'));
app.use('/api/role', require('./routes/roleRoutes'));
app.use('/api/floor', require('./routes/floorRoutes'));
app.use('/api/room', require('./routes/roomRoutes'));
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
