import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        setError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Books</h1>
      {error && <p>{error}</p>}
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4" key={book._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Price: ${book.price}</p>
                <Link to={`/books/${book._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;