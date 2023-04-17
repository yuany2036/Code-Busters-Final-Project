const axios = require('axios');

const searchBook = async (req, res, next) => {
    const query = req.query.q;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    try {
        const response = await axios.get(url);
        const books = response.data.items;
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addToBooksList = async (req, res, next) => {}
const updateBookStatus = async (req, res, next) => {}
const removeFromBooksList = async (req, res, next) => {}

module.exports = { searchBook, addToBooksList, updateBookStatus, removeFromBooksList };