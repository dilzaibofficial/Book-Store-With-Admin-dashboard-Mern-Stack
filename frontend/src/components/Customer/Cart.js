import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', { withCredentials: true });
        setCartData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        items: cartData,
        totalAmount: cartData.reduce((total, item) => total + (item.bookId ? item.bookId.price * item.quantity : 0), 0),
      }, { withCredentials: true });
      alert('Order placed successfully');
      setCart([]); // Clear the cart state
      setCartData([]); // Clear the cart data in the component
      await axios.delete('http://localhost:5000/api/cart', { withCredentials: true }); // Clear the cart on the server side
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data.message : error.message);
      alert('Failed to place order');
    }
  };

  const handleQuantityChange = async (bookId, quantity) => {
    try {
      const response = await axios.put('http://localhost:5000/api/cart/quantity', { bookId, quantity }, { withCredentials: true });
      setCartData(response.data.items);
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Cart</h1>
      <ul className="list-group">
        {cartData.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {item.bookId ? `${item.bookId.name} - $${item.bookId.price} x ${item.quantity}` : 'Book details not available'}
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => handleQuantityChange(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleQuantityChange(item.bookId._id, item.quantity + 1)}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Cart;