const axios = require('axios');
const express = require('express');
const { searchBook, addToBooksList, updateBookStatus, removeFromBooksList } = require('../controllers/booksController');
require('dotenv').config();
const { auth } = require('../middleware/authentication');

const router = express.Router();

// Router to find books
router.route("/").get(searchBook).post(auth,addToBooksList);
router.route("/:id").patch(auth,updateBookStatus).delete(auth,removeFromBooksList)

module.exports = router;
