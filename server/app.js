// Importing Dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();

// Importing Routes and Global Error Handlers
const usersRouter = require("./routes/usersRouter")
const authRouter = require("./routes/authRouter")
const meRouter = require("./routes/meRouter")
const searchRouter = require("./routes/searchRouter")
const { routeNotFound, globalErrorHandler } = require("./middleware/errorHandlers")

// Initialize App 
const app = express();

// Middleware 
app.use(express.json({ limit: "1MB" }));
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:4000",
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/search', searchRouter)
app.use('/me', meRouter)

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
})

mongoose.connection
    .once('error', console.error)
    .once('open', () => console.log('Database connection established'));

module.exports = app;