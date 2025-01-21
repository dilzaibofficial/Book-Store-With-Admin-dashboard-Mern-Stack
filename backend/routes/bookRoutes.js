const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook, upload } = require('../controllers/bookController');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(adminProtect, upload.single('image'), addBook);

router.route('/:id')
  .get(getBookById)
  .put(adminProtect, upload.single('image'), updateBook)
  .delete(adminProtect, deleteBook);

module.exports = router;