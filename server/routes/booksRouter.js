const express = require('express');
const {
  searchBook,
  searchBookByID,
  bookReviewById,
  addToBookCollection,
  getBookCollection,
  updateBookStatus,
  deleteBookFromCollection,
  recommendBooksByGenre,
  getPopularBooks,
} = require('../controllers/booksController');
require('dotenv').config();
const { auth } = require('../middleware/authentication');

const router = express.Router();

// Router to find books
router.route('/').get(searchBook);
router.route('/searchById').get(searchBookByID);
router.route('/popular').get(getPopularBooks);
router.route('/recommend').get(auth, recommendBooksByGenre);
router.route('/reviews').get(bookReviewById);
router
  .route('/user')
  .get(auth, getBookCollection)
  .post(auth, addToBookCollection)
  .patch(auth, updateBookStatus)
  .delete(auth, deleteBookFromCollection);

module.exports = router;
