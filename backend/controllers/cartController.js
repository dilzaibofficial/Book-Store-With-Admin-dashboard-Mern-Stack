const Cart = require('../models/Cart');

const addToCart = async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.session.user._id });

    if (cart) {
      // If cart exists for the user, update it
      const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

      if (itemIndex > -1) {
        // If item exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If item does not exist in the cart, add it
        cart.items.push({ bookId, quantity });
      }

      cart = await cart.save();
      res.status(200).json(cart);
    } else {
      // If no cart exists, create a new one
      const newCart = await Cart.create({
        userId: req.session.user._id,
        items: [{ bookId, quantity }],
      });

      res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.user._id }).populate('items.bookId', 'name price');
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
      res.json({ message: 'Cart cleared' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.session.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart = await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error.message);
    res.status(500).json({ message: 'Failed to update cart item quantity' });
  }
};

module.exports = { addToCart, getCart, clearCart, updateCartItemQuantity };