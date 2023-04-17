const axios = require('axios');

const searchTv = async (req, res, next) => {
    const query = req.query.q;
    const apiKey = process.env.MOVIEDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;

    try {
        const response = await axios.get(url);
        const tvShows = response.data.results;
        res.json(tvShows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addToTvList = async (req, res, next) => {
}

const updateTvStatus = async (req, res, next) => {
}

const removeFromTvList = async (req, res, next) => {
}

module.exports = {
    searchTv, addToTvList, updateTvStatus, removeFromTvList
};