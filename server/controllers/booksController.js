const axios = require('axios');
const bookModel = require('../models/bookModel');
const Preferences = require('../models/preferenceModel');

// Helper function to get user's book collection
async function getBookCollectionForUser(userId) {
    const bookCol = await bookModel.findOne({ user: userId }).populate('books');
    if (!bookCol) {
        throw new Error("Book collection not found");
    }
    return bookCol;
}

// External API call to search for books by title
exports.searchBook = async (req, res, next) => {
    const title = req.query.title;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}`;
    try {
        const response = await axios.get(url);
        const books = response.data.items;
        res.json(books);
    } catch (error) {
        next(error)
    }
};

// External API call to search for books by ID
exports.searchBookByID = async (req, res, next) => {
    const id = req.body.id;
    const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
    try {
        const response = await axios.get(url);
        const book = response.data;
        res.json(book);
    } catch (error) {
        next(error)
    }
};

// Get user's book collection
exports.getBookCollection = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const bookCol = await getBookCollectionForUser(userId);
        return res.json({ success: true, books: bookCol.books });
    } catch (error) {
        next(error)
    }
};

// Add book to user's collection
exports.addToBookCollection = async (req, res, next) => {
    const { id, imageLinks, title, categories } = req.body;
    const { userId } = req.params;

    try {
        let bookCol = await bookModel.findOne({ user: userId });
        if (!bookCol) {
            bookCol = new bookModel({ user: userId, books: [] });
        }
        const alreadySaved = bookCol.books.find(book => book.title === title);
        if (alreadySaved) {
            return res.status(400).json({ success: false, message: "Book already exists in collection" });
        }
        bookCol.books.push({ id, poster_path: imageLinks, title, genres: categories });
        await bookCol.save();
        return res.json({ success: true, message: "Book added to collection" });
    } catch (error) {
        next(error)
    }
};

// Update book status in user's collection
exports.updateBookStatus = async (req, res, next) => {
    const { bookId, status } = req.body;
    const { userId } = req.params;
    try {
        const bookCol = await getBookCollectionForUser(userId);
        const book = bookCol.books.find(book => book.id.toString() === bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found in user's collection" });
        }
        book.status = status;
        await bookCol.save();
        return res.json({ success: true, message: "Book status updated" });
    } catch (error) {
        next(error)
    }
};

// Delete book from user's collection
exports.deleteBookFromCollection = async (req, res, next) => {
    const { bookId } = req.body;
    const { userId } = req.params;
    try {
        const bookCol = await getBookCollectionForUser(userId);
        const bookIndex = bookCol.books.findIndex(book => book.id.toString() === bookId);
        if (bookIndex === -1) {
            return res.status(404).json({ success: false, message: "Book not found in user's collection" });
        }
        bookCol.books.splice(bookIndex, 1);
        await bookCol.save();
        return res.json({ success: true, message: "Book removed from collection" });
    } catch (error) {
        next(error)
    }
};

exports.recommendBooksByGenre = async (req, res, next) => {
    try {
        const {_id} = req.user;

        const preferences = await Preferences.findOne({ user: _id});
        
        if (!preferences) {
            return res.status(404).json({ success: false, message: "Preferences not found" });
        }
        
        const genres = preferences.genres.map((genre) => JSON.parse(genre).name);
        const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genres.join('+OR+subject:')}`;
        const response = await axios.get(url);
        const books = response.data.items;
        res.json(books);
    } catch (error) {
        next(error)
    }
};