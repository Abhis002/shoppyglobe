const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItems');
const Product = require('../models/Products');
const { protect } = require('../middleware/authMiddleware');

// POST /cart
router.post('/', protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const cartItem = new CartItem({ userId: req.user._id, productId, quantity });
  await cartItem.save();
  res.status(201).json(cartItem);
});

// PUT /cart/:id
router.put('/:id', protect, async (req, res) => {
  const cartItem = await CartItem.findById(req.params.id);
  if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

  cartItem.quantity = req.body.quantity;
  await cartItem.save();
  res.json(cartItem);
});

// DELETE /cart/:id
router.delete('/:id', protect, async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item removed' });
});

module.exports = router;
