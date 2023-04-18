const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModel');

exports.auth = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const { jwt: token } = req.cookies;

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user based on the token's ID
    const user = await User.findById(decodedToken.id);
    if (!user) throw createError(404, 'User not found');

    // Attach the user to the request object
    req.user = user;

    // Move to the next middleware
    next();
  } catch (error) {
    next(error);
  }
};