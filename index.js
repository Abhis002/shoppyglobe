require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoute');
const authRoutes = require('./routes/authRoutes');


const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection string - replace with your MongoDB URI if needed
const mongoURI = 'mongodb://localhost:27017/shoppyglobe';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/', authRoutes);  // for user register/login

  // for user register/login

// Error handling middleware 
app.use(errorHandler);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
