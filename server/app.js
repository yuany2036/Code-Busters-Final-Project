// Importing Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
require('./services/passport-setup');
require('./services/passport-google-setup');

// Importing Routes and Global Error Handlers
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const meRouter = require('./routes/meRouter');
const moviesRouter = require('./routes/moviesRouter');
const tvshowsRouter = require('./routes/tvshowsRouter');
const booksRouter = require('./routes/booksRouter');
const gamesRouter = require('./routes/gamesRouter');
const passportRouter = require('./routes/passportRouter');
const cloudRouter = require('./routes/cloudRouter');
const {
  routeNotFound,
  globalErrorHandler,
} = require('./middleware/errorHandlers');

// Initialize App
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:4000',
      'http://localhost:5173',
      'https://entscape-spa.onrender.com',
    ],
    credentials: true,
  })
);
app.use(
  express.json({
    limit: '10MB',
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// Add session middleware and initialize Passport
app.use(
  session({ secret: 'some secret', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/me', meRouter);
app.use('/movies', moviesRouter);
app.use('/tvshows', tvshowsRouter);
app.use('/books', booksRouter);
app.use('/games', gamesRouter);
app.use('/', passportRouter);
app.use('/cloud', cloudRouter);

// Error Handling Middleware
app.use(routeNotFound);
app.use(globalErrorHandler);

// Connect to MongoDB
const { DB_PROTOCOL, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_QUERIES } =
  process.env;
const URI = `${DB_PROTOCOL}${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_QUERIES}`;

console.log(`Starting server in ${process.env.NODE_ENV} mode`);

mongoose.set('strictQuery', false);
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('error', console.error)
  .once('open', () => console.log('Database connection established'));

module.exports = app;
