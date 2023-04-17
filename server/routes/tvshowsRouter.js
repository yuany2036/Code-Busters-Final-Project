const axios = require('axios');
const express = require('express');
const {searchTv, addToTvList,updateTvStatus,removeFromTvList } = require('../controllers/tvshowsController');
require('dotenv').config();
const { auth } = require('../middleware/authentication');

const router = express.Router();

// Router to find tv shows
router.route("/").get(searchTv).post(auth,addToTvList);
router.route("/:id").patch(auth,updateTvStatus).delete(auth,removeFromTvList)

module.exports = router;
