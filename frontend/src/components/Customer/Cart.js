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
        totalAmount: cartData.reduce((total, item) => total + item.bookId.price * item.quantity, 0),
      }, { withCredentials: true });
      alert('Order placed successfully');
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data.message : error.message);
      alert('Failed to place order');
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
          <li className="list-group-item" key={index}>
            {item.bookId.name} - ${item.bookId.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Cart;