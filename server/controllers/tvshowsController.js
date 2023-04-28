const axios = require('axios');
const tvModel = require('../models/tvshowModel');

// Helper function to get user's tv collection
async function getTvCollectionForUser(_id) {
  const tvCol = await tvModel.findOne({ user: _id }).populate('series');
  if (!tvCol) {
    throw new Error('TV collection not found');
  }
  return tvCol;
}

// External API call to search for tv shows by title
exports.searchTv = async (req, res, next) => {
  const title = req.query.title;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${title}`;

  try {
    const response = await axios.get(url);
    const tvShows = response.data.results;
    res.json(tvShows);
  } catch (error) {
    next(error);
  }
};

// External API call to search for tv shows by ID
exports.searchTvById = async (req, res, next) => {
  const id = req.query.id;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await axios.get(url);
    const tvShow = response.data;
    res.json(tvShow);
  } catch (error) {
    next(error);
  }
};

exports.tvReviewsById = async (req, res, next) => {
  const id = req.query.id;
  const apiKey = process.env.MOVIEDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}&language=en-US`;

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    next(error);
  }
};

// Get user's tv collection
exports.getTvCollection = async (req, res, next) => {
  const { _id } = req.user;
  try {
    // Find user's tv collection and populate tv details
    const tvCol = await getTvCollectionForUser(_id);
    return res.json({ success: true, tvShows: tvCol.series });
  } catch (error) {
    next(error);
  }
};

// Add tv show to user's collection
exports.addToTvCollection = async (req, res, next) => {
  const { id, posterPath, title, genres, seasons } = req.body;
  const { _id } = req.user;

  try {
    let tvShowCol = await tvModel.findOne({ user: _id });
    if (!tvShowCol) {
      tvShowCol = new tvModel({ user: _id, series: [] });
    }
    const alreadySaved = tvShowCol.series.find(
      (tvShow) => tvShow.title === title
    );
    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: 'Tv Show already exists in collection',
      });
    }
    tvShowCol.series.push({
      id,
      poster_path: posterPath,
      title,
      genres,
      seasons,
    });
    await tvShowCol.save();
    return res.json({ success: true, message: 'Tv Show added to collection' });
  } catch (error) {
    next(error);
  }
};

// Update tv show status
exports.updateTvStatus = async (req, res, next) => {
  const { tvId, status } = req.body;
  const { _id } = req.user;
  try {
    const tvCol = await getTvCollectionForUser(_id);
    const tvShow = tvCol.series.find((tvShow) => tvShow.id === tvId);
    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: "Tv Show not found in user's collection",
      });
    }
    tvShow.status = status;
    await tvCol.save();
    return res.json({ success: true, message: 'Tv Show status updated' });
  } catch (error) {
    next(error);
  }
};

// Delete tv show from user's collection
exports.deleteTvFromCollection = async (req, res, next) => {
  const { tvId } = req.body;
  const { _id } = req.user;
  try {
    const tvCol = await getTvCollectionForUser(_id);
    const tvIndex = tvCol.series.findIndex((tvShow) => tvShow.id === tvId);
    if (tvIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Tv Show not found in user's collection",
      });
    }
    tvCol.series.splice(tvIndex, 1);
    await tvCol.save();
    return res.json({
      success: true,
      message: 'Tv Show removed from collection',
    });
  } catch (error) {
    next(error);
  }
};

exports.getPopularTvShows = async (req, res, next) => {
  const apiKey = process.env.MOVIEDB_API_KEY;
  const totalPages = 10;
  let fetchedTVShows = [];

  for (let page = 1; page <= totalPages; page++) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      const englishTVShows = response.data.results.filter(
        (tvShow) => tvShow.original_language === 'en'
      );
      fetchedTVShows = fetchedTVShows.concat(englishTVShows);
    } catch (error) {
      next(error);
    }
  }

  res.status(200).json(fetchedTVShows.slice(0, 20));
};
