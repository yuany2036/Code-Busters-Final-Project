const axios = require('axios');
const bookModel = require('../models/bookModel');
const User = require('../models/userModel');

// Helper function to get user's book collection
async function getBookCollectionForUser(_id) {
  const bookCol = await bookModel.findOne({ user: _id }).populate('books');
  if (!bookCol) {
    throw new Error('Book collection not found');
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
    next(error);
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
    next(error);
  }
};

// Get user's book collection
exports.getBookCollection = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const bookCol = await getBookCollectionForUser(_id);
    return res.json({ success: true, books: bookCol.books });
  } catch (error) {
    next(error);
  }
};

// Add book to user's collection
exports.addToBookCollection = async (req, res, next) => {
  const { id, imageLinks, title, categories } = req.body;
  const { _id } = req.user;

  try {
    let bookCol = await bookModel.findOne({ user: _id });
    if (!bookCol) {
      bookCol = new bookModel({ user: _id, books: [] });
    }
    const alreadySaved = bookCol.books.find((book) => book.title === title);
    if (alreadySaved) {
      return res
        .status(400)
        .json({ success: false, message: 'Book already exists in collection' });
    }
    bookCol.books.push({
      id,
      poster_path: imageLinks,
      title,
      genres: categories,
    });
    await bookCol.save();
    return res.json({ success: true, message: 'Book added to collection' });
  } catch (error) {
    next(error);
  }
};

// Update book status in user's collection
exports.updateBookStatus = async (req, res, next) => {
  const { bookId, status } = req.body;
  const { _id } = req.user;
  try {
    const bookCol = await getBookCollectionForUser(_id);
    const book = bookCol.books.find((book) => book.id.toString() === bookId);
    if (!book) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found in user's collection",
        });
    }
    book.status = status;
    await bookCol.save();
    return res.json({ success: true, message: 'Book status updated' });
  } catch (error) {
    next(error);
  }
};

// Delete book from user's collection
exports.deleteBookFromCollection = async (req, res, next) => {
  const { bookId } = req.body;
  const { _id } = req.user;
  try {
    const bookCol = await getBookCollectionForUser(_id);
    const bookIndex = bookCol.books.findIndex(
      (book) => book.id.toString() === bookId
    );
    if (bookIndex === -1) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found in user's collection",
        });
    }
    bookCol.books.splice(bookIndex, 1);
    await bookCol.save();
    return res.json({ success: true, message: 'Book removed from collection' });
  } catch (error) {
    next(error);
  }
};

exports.recommendBooksByGenre = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const { preferences, genres } = user;
    if (preferences === 'none') {
      return res
        .status(400)
        .json({ success: false, message: 'User does not have any preference' });
    }
    const genreTitles = genres
      .filter((genre) => genre)
      .map((genre) => JSON.parse(genre).name);
    console.log('Genre Titles:', genreTitles);

    const urls = genreTitles.map(
      (genreTitle) =>
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genreTitle}`
    );

    // Fetch books from all the URLs and combine them
    const responses = await Promise.all(urls.map((url) => axios.get(url)));
    const books = responses.flatMap((response) =>
      response.data.items.slice(0, 5)
    );

    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getPopularBooks = async (req, res, next) => {
  const endPoint = '/lists/current/mass-market-paperback.json';
  const APIKey = process.env.NY_TIMES_KEY;
  const NYTurl = `https://api.nytimes.com/svc/books/v3${endPoint}?api-key=${APIKey}`;

  try {
    const nyTimesRes = await axios.get(NYTurl);
    const books = nyTimesRes.data.results.books;

    const results = await Promise.all(
      books.map(async ({ isbns, title }) => {
        const isbn = isbns[0]['isbn10'];
        const googleBooksAPIURL = `https://www.googleapis.com/books/v1/volumes?q=${title}+isbn:${isbn}`;
        const res = await axios.get(googleBooksAPIURL);
        return res.data.items[0].volumeInfo;
      })
    );

    res.status(200).json({ results });
    console.log(results);
  } catch (error) {
    next(error);
  }
};
