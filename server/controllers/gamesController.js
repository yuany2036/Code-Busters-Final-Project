const axios = require('axios');

const searchGame = async (req, res, next) => {
    const query = req.query.q;
    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;

    try {
        const response = await axios.get(url);
        const games = response.data.results;
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addToGamesList = async (req, res, next) => {}

const updateGameStatus = async (req, res, next) => {}

const removeFromGamesList = async (req, res, next) => {}

module.exports = { searchGame, addToGamesList, updateGameStatus, removeFromGamesList };