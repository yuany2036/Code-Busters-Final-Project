const express = require('express');
const { searchMovie, addToMovieCollection, updateMovieStatus, deleteMovieFromCollection, getMovieCollection, searchMovieById } = require('../controllers/moviesController');
require('dotenv').config();

const router = express.Router();

// Router to find movies
router.route("/").get(searchMovie);
router.route("/searchById").get(searchMovieById)
router.route("/:userId").get(getMovieCollection).post(addToMovieCollection).patch(updateMovieStatus).delete(deleteMovieFromCollection);

module.exports = router;