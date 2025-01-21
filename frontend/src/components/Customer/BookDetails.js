import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = ({ handleAddToCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setError('Failed to fetch book details');
      }
    };

    fetchBook();
  }, [id]);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        bookId: book._id,
        quantity: 1,
      }, { withCredentials: true });
      alert('Book added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data.message : error.message);
      alert('Failed to add to cart');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`http://localhost:5000/uploads/${book.image}`} className="img-fluid" alt={book.name} />
        </div>
        <div className="col-md-6">
          <h1>{book.name}</h1>
          <p>Author: {book.author}</p>
          <p>Price: ${book.price}</p>
          <p>Category: {book.category}</p>
          <p>Availability: {book.availability ? 'Available' : 'Out of Stock'}</p>
          <button className="btn btn-primary" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;