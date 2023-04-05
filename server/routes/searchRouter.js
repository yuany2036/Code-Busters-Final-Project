const axios = require('axios');
const express = require('express');
const { searchMovie, searchTv } = require('../controllers/moviedbController');
const { searchGame } = require('../controllers/rawgController');
const { searchBook } = require('../controllers/googlebooksController');
require('dotenv').config();

const router = express.Router();

// Router to find movies
router.get('/movie', searchMovie);

// Router to find tv shows
router.get('/tv', searchTv);

// Router to find books
router.get('/book', searchBook);

// Router to find games
router.get('/game', searchGame);

module.exports = router;