const express = require('express');
const {searchGame,searchGameById,getGameCollection,addToGameCollection,updateGameStatus,deleteGameFromCollection} = require('../controllers/gamesController');
require('dotenv').config();
const {auth} = require('../middleware/authentication');

const router = express.Router();
// Router to find games
router.route("/").get(searchGame);
router.route("/searchById").get(searchGameById)
router.route("/").get(auth,getGameCollection).post(auth,addToGameCollection).patch(auth,updateGameStatus).delete(auth,deleteGameFromCollection);


module.exports = router;
