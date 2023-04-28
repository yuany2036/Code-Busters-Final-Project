const express = require('express');
const {
  searchTv,
  searchTvById,
  tvReviewsById,
  updateTvStatus,
  getTvCollection,
  addToTvCollection,
  deleteTvFromCollection,
  getPopularTvShows,
} = require('../controllers/tvshowsController');
require('dotenv').config();
const { auth } = require('../middleware/authentication');

const router = express.Router();

// Router to find tv shows
router.route('/').get(searchTv);
router.route('/searchById').get(searchTvById);
router.route('/reviews').get(tvReviewsById);
router.route('/popular').get(getPopularTvShows);
router
  .route('/user')
  .get(auth, getTvCollection)
  .post(auth, addToTvCollection)
  .patch(auth, updateTvStatus)
  .delete(auth, deleteTvFromCollection);

module.exports = router;
