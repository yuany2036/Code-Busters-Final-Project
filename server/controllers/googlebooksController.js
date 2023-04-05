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

module.exports = { searchBook };