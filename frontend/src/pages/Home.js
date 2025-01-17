import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import slide1 from '../uploads/slide1.jpg';
import slide2 from '../uploads/slide2.jpg';
import slide3 from '../uploads/slide3.jpg';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src={slide1}
            alt="First slide"
            style={{ height: '150px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src={slide2}
            alt="Second slide"
            style={{ height: '150px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src={slide3}
            alt="Third slide"
            style={{ height: '150px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Books</h2>
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-4" key={book._id}>
              <div className="card">
                <img src={book.image} className="card-img-top" alt={book.title} />
                <div className="card-body">
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text"><strong>Author:</strong> {book.author}</p>
                  {/* <p className="card-text">{book.description}</p> */}
                  <p className="card-text"><strong>Price:</strong> ${book.price}</p>
                  <a href={`/books/${book._id}`} className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;