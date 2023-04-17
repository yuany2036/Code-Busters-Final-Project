
const express = require('express');
const { searchGame,addToGamesList,updateGameStatus,removeFromGamesList } = require('../controllers/gamesController');
require('dotenv').config();
const { auth } = require('../middleware/authentication');

const router = express.Router();
// Router to find games
router.route("/").get(searchGame).post(auth,addToGamesList);
router.route("/:id").patch(auth,updateGameStatus).delete(auth,removeFromGamesList)

module.exports = router;