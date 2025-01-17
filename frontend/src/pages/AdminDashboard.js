import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Books</h5>
              <p className="card-text">Add, update, or delete books.</p>
              <Link to="/admin/books" className="btn btn-primary">Go to Manage Books</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Sales Dashboard</h5>
              <p className="card-text">View sales statistics and reports.</p>
              <Link to="/admin/sales" className="btn btn-primary">Go to Sales Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;