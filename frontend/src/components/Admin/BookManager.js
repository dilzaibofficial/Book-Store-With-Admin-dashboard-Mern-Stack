import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [newBook, setNewBook] = useState({ name: '', author: '', price: '', category: '', availability: true, image: null });
  const [editBook, setEditBook] = useState(null);

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newBook.name);
    formData.append('author', newBook.author);
    formData.append('price', newBook.price);
    formData.append('category', newBook.category);
    formData.append('availability', newBook.availability);
    formData.append('image', newBook.image);

    try {
      const response = await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks([...books, response.data]);
      setNewBook({ name: '', author: '', price: '', category: '', availability: true, image: null });
    } catch (error) {
      setError('Failed to add book');
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editBook.name);
    formData.append('author', editBook.author);
    formData.append('price', editBook.price);
    formData.append('category', editBook.category);
    formData.append('availability', editBook.availability);
    if (editBook.image) {
      formData.append('image', editBook.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/books/${editBook._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks(books.map((b) => (b._id === editBook._id ? response.data : b)));
      setEditBook(null);
    } catch (error) {
      setError('Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h1>Manage Books</h1>
          {error && <p>{error}</p>}
          <div className="list-group" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            {books.map((book) => (
              <div className="list-group-item" key={book._id}>
                <h5>{book.name}</h5>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price}</p>
                <p>Category: {book.category}</p>
                <p>Availability: {book.availability ? 'Available' : 'Out of Stock'}</p>
                <button className="btn btn-warning me-2" onClick={() => setEditBook(book)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2>Add Book</h2>
          <form onSubmit={handleAddBook}>
            <input
              type="text"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              placeholder="Name"
              required
              className="form-control mb-2"
            />
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              placeholder="Author"
              required
              className="form-control mb-2"
            />
            <input
              type="number"
              value={newBook.price}
              onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              placeholder="Price"
              required
              className="form-control mb-2"
            />
            <input
              type="text"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              placeholder="Category"
              required
              className="form-control mb-2"
            />
            <label className="form-check-label">
              Availability:
              <input
                type="checkbox"
                checked={newBook.availability}
                onChange={(e) => setNewBook({ ...newBook, availability: e.target.checked })}
                className="form-check-input ms-2"
              />
            </label>
            <input
              type="file"
              onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
              className="form-control mb-2"
              required
            />
            <button type="submit" className="btn btn-primary mt-2">Add Book</button>
          </form>
          {editBook && (
            <div className="mt-5">
              <h2>Edit Book</h2>
              <form onSubmit={handleUpdateBook}>
                <input
                  type="text"
                  value={editBook.name}
                  onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
                  placeholder="Name"
                  required
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={editBook.author}
                  onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                  placeholder="Author"
                  required
                  className="form-control mb-2"
                />
                <input
                  type="number"
                  value={editBook.price}
                  onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
                  placeholder="Price"
                  required
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={editBook.category}
                  onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
                  placeholder="Category"
                  required
                  className="form-control mb-2"
                />
                <label className="form-check-label">
                  Availability:
                  <input
                    type="checkbox"
                    checked={editBook.availability}
                    onChange={(e) => setEditBook({ ...editBook, availability: e.target.checked })}
                    className="form-check-input ms-2"
                  />
                </label>
                <input
                  type="file"
                  onChange={(e) => setEditBook({ ...editBook, image: e.target.files[0] })}
                  className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary mt-2">Update Book</button>
                <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => setEditBook(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookManager;