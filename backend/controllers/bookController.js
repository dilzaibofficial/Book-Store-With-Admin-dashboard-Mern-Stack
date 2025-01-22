const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book details' });
  }
};

const addBook = async (req, res) => {
  const { name, author, price, category, availability } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const book = new Book({
      name,
      author,
      price,
      category,
      availability,
      image,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const { name, author, price, category, availability } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.name = name;
      book.author = author;
      book.price = price;
      book.category = category;
      book.availability = availability;
      if (image) {
        book.image = image;
      }

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteBook = async (req, res) => {
  try {
    console.log(`Attempting to delete book with ID: ${req.params.id}`);
    
    // Use findByIdAndDelete directly to delete the book
    const book = await Book.findByIdAndDelete(req.params.id);

    if (book) {
      console.log(`Book with ID: ${req.params.id} removed successfully`);
      res.json({ message: 'Book removed' });
    } else {
      console.log(`Book with ID: ${req.params.id} not found`);
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Failed to delete book' });
  }
};


module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, upload };