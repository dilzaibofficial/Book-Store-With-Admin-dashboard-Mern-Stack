import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">E-Bookstore</h5>
            <p>
              Your one-stop shop for all your book needs. Find the best books at the best prices.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/books" className="text-dark">Books</a>
              </li>
              <li>
                <a href="/cart" className="text-dark">Cart</a>
              </li>
              <li>
                <a href="/admin/login" className="text-dark">Admin Login</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-dark">Email: support@ebookstore.com</p>
              </li>
              <li>
                <p className="text-dark">Phone: +1 234 567 890</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-dark text-white">
        © 2023 E-Bookstore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;