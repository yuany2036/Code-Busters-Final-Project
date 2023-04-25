const express = require('express');
const { searchBook,searchBookByID, addToBookCollection, getBookCollection, updateBookStatus, deleteBookFromCollection, } = require('../controllers/booksController');
require('dotenv').config();

const router = express.Router();

// Router to find books
router.route("/").get(searchBook);
router.route("/searchById").get(searchBookByID);
router.route("/:userId").get(getBookCollection).post( addToBookCollection).patch(updateBookStatus).delete(deleteBookFromCollection);

module.exports = router;