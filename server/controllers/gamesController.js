const axios = require('axios');
const gameModel = require('../models/gameModel');

// Helper function to get user's game collection
async function getGameCollectionForUser(_id) {
    const gameCol = await gameModel.findOne({ user: _id});
    if (!gameCol) {
        throw new Error("Game collection not found");
    }
    return gameCol;
}

// External API call to search for games by title
exports.searchGame = async (req, res, next) => {
    const title = req.query.title;
    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${title}`;

    try {
        const response = await axios.get(url);
        const games = response.data.results;
        res.json(games);
    } catch (error) {
        next(error);
    }
};

// External API call to search for games by ID
exports.searchGameById = async (req, res, next) => {
    const id = req.body.id;
    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const game = response.data;
        res.json(game);
    } catch (error) {
        next(error);
    }
};

// Get user's game collection
exports.getGameCollection = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const gameCol = await getGameCollectionForUser(_id);
        return res.json({ success: true, games: gameCol.games });
    } catch (error) {
        next(error);
    }
};

// Add game to user's collection
exports.addToGameCollection = async (req, res, next) => {
    const { id, background_image, name, genres } = req.body;
    const { _id } = req.user;
    try {
        let gameCol = await gameModel.findOne({ user: _id });
        if (!gameCol) {
            gameCol = new gameModel({ user: _id, games: [] });
        }
        const alreadySaved = gameCol.games.find(game => game.title === name);
        if (alreadySaved) {
            return res.status(400).json({ success: false, message: "Game already exists in collection" });
        }
        gameCol.games.push({ id, poster_path: background_image, title: name, genres });
        await gameCol.save();
        return res.json({ success: true, message: "Game added to collection" });
    } catch (error) {
        next(error);
    }
};

// Update game status
exports.updateGameStatus = async (req, res, next) => {
    const { gameId, status } = req.body;
    const { _id } = req.user;
    try {
        const gameCol = await getGameCollectionForUser(_id);
        const game = gameCol.games.find(game => game.id === gameId);
        if (!game) {
            return res.status(404).json({ success: false, message: "Game not found in user's collection" });
        }
        game.status = status;
        await gameCol.save();
        return res.json({ success: true, message: "Game status updated" });
    } catch (error) {
        next(error)
    }
};

// Delete game from user's collection
exports.deleteGameFromCollection = async (req, res, next) => {
    const { gameId } = req.body;
    const { _id } = req.user;
    try {
        const gameCol = await getGameCollectionForUser(_id);
        const gameIndex = gameCol.games.findIndex(game => game.id === gameId);
        if (gameIndex === -1) {
            return res.status(404).json({ success: false, message: "Game not found in user's collection" });
        }
        gameCol.games.splice(gameIndex, 1);
        await gameCol.save();
        return res.json({ success: true, message: "Game removed from collection" });
    } catch (error) {
        next(error);
    }
};