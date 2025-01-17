import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {error && <p>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id}, Total Amount: ${order.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;