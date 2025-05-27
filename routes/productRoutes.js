const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// GET /products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /products
router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
