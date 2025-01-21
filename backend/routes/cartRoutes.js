const express = require('express');
const { getCart, addToCart, clearCart, updateCartItemQuantity } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/quantity')
  .put(protect, updateCartItemQuantity); // Add this line to handle updating item quantities

module.exports = router;