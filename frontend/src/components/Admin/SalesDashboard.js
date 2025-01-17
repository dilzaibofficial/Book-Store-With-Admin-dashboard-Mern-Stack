import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('daily');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all', { withCredentials: true });
        console.log('Fetched sales data:', response.data); // Add logging
        setSalesData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const filterSalesData = (data, filter) => {
    const now = new Date();
    return data.filter(order => {
      const orderDate = new Date(order.orderDate);
      if (filter === 'daily') {
        return orderDate.toDateString() === now.toDateString();
      } else if (filter === 'weekly') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo && orderDate <= now;
      } else if (filter === 'monthly') {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const filteredSalesData = filterSalesData(salesData, filter);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Sales Dashboard</h2>
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">Filter by:</label>
        <select id="filter" className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Order Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalesData.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId.name} ({order.userId.email})</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDashboard;