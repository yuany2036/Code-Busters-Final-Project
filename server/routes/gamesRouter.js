const express = require('express');
const {searchGame,searchGameById,getGameCollection,addToGameCollection,updateGameStatus,deleteGameFromCollection} = require('../controllers/gamesController');
require('dotenv').config();

const router = express.Router();
// Router to find games
router.route("/").get(searchGame);
router.route("/searchById").get(searchGameById)
router.route("/:userId").get(getGameCollection).post(addToGameCollection).patch(updateGameStatus).delete(deleteGameFromCollection);


module.exports = router;
