const axios = require('axios');
const tvModel = require('../models/tvshowModel');

// Helper function to get user's tv collection
async function getTvCollectionForUser(userId) {
    const tvCol = await tvModel.findOne({ user: userId }).populate('series');
    if (!tvCol) {
        throw new Error("TV collection not found");
    }
    return tvCol;
};

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
        next(error)
    }
};

// External API call to search for tv shows by ID
exports.searchTvById = async (req, res, next) => {
    const id = req.body.id;
    const apiKey = process.env.MOVIEDB_API_KEY;
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;

    try {
        const response = await axios.get(url);
        const tvShow = response.data;
        res.json(tvShow);
    } catch (error) {
        next(error)
    }
};

// Get user's tv collection
exports.getTvCollection = async (req, res, next) => {
    const { userId } = req.params;
    try {
        // Find user's tv collection and populate tv details
        const tvCol = await getTvCollectionForUser(userId);
        return res.json({ success: true, tvShows: tvCol.series });
    } catch (error) {
        next(error)
    }
};

// Add tv show to user's collection
exports.addToTvCollection = async (req, res, next) => {
    const { id, poster_path, name, genres, seasons } = req.body;
    const { userId } = req.params;

    try {
        let tvShowCol = await tvModel.findOne({ user: userId });
        if (!tvShowCol) {
            tvShowCol = new tvModel({ user: userId, series: [] });
        }
        const alreadySaved = tvShowCol.series.find(tvShow => tvShow.title === name);
        if (alreadySaved) {
            return res.status(400).json({ success: false, message: "Tv Show already exists in collection" });
        }
        tvShowCol.series.push({ id, poster_path, title: name, genres, seasons });
        await tvShowCol.save();
        return res.json({ success: true, message: "Tv Show added to collection" });
    } catch (error) {
        next(error)
    }
};

// Update tv show status
exports.updateTvStatus = async (req, res, next) => {
    const { tvId, status } = req.body;
    const { userId } = req.params;
    try {
        const tvCol = await getTvCollectionForUser(userId);
        const tvShow = tvCol.series.find(tvShow => tvShow.id === tvId);
        if (!tvShow) {
            return res.status(404).json({ success: false, message: "Tv Show not found in user's collection" });
        }
        tvShow.status = status;
        await tvCol.save();
        return res.json({ success: true, message: "Tv Show status updated" });
    } catch (error) {
        next(error)
    }
};

// Delete tv show from user's collection
exports.deleteTvFromCollection = async (req, res, next) => {
    const { tvId } = req.body;
    const { userId } = req.params;
    try {
        const tvCol = await getTvCollectionForUser(userId);
        const tvIndex = tvCol.series.findIndex(tvShow => tvShow.id === tvId);
        if (tvIndex === -1) {
            return res.status(404).json({ success: false, message: "Tv Show not found in user's collection" });
        }
        tvCol.series.splice(tvIndex, 1);
        await tvCol.save();
        return res.json({ success: true, message: "Tv Show removed from collection" });
    } catch (error) {
        next(error)
    }
};

