// Importing Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importing Routes and Global Error Handlers
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const meRouter = require('./routes/meRouter');
const preferencesRouter = require('./routes/preferencesRouter');
const moviesRouter = require('./routes/moviesRouter');
const tvshowsRouter = require('./routes/tvshowsRouter');
const booksRouter = require('./routes/booksRouter');
const gamesRouter = require('./routes/gamesRouter');
const {
  routeNotFound,
  globalErrorHandler,
} = require('./middleware/errorHandlers');

// Initialize App
const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:4000', 'http://localhost:5174'],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: '1MB',
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/me', meRouter);
app.use('/preferences', preferencesRouter);
app.use('/movies', moviesRouter);
app.use('/tvshows', tvshowsRouter);
app.use('/books', booksRouter);
app.use('/games', gamesRouter);

// Error Handling Middleware
app.use(routeNotFound);
app.use(globalErrorHandler);

// Connect to MongoDB
const { DB_PROTOCOL, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_QUERIES } =
  process.env;
const URI = `${DB_PROTOCOL}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_QUERIES}`;

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('error', console.error)
  .once('open', () => console.log('Database connection established'));

module.exports = app;
