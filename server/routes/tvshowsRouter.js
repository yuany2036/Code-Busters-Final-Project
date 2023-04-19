const express = require('express');
const {searchTv, searchTvById,updateTvStatus,getTvCollection,addToTvCollection, deleteTvFromCollection} = require('../controllers/tvshowsController');
require('dotenv').config();

const router = express.Router();

// Router to find tv shows
router.route("/").get(searchTv);
router.route("/searchById").get(searchTvById);
router.route("/:userId").get(getTvCollection).post(addToTvCollection).patch(updateTvStatus).delete(deleteTvFromCollection);

module.exports = router;
