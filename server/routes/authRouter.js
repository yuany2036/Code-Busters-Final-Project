const express = require('express');
const { createUser, login, logout } = require("../controllers/authController");
const { validateUser, sanitizeUser, loginValidation } = require("../middleware/validation");
const router = express.Router();

// Route to create a new user
router.post('/register', validateUser, sanitizeUser, createUser);

// Routes to Login and Logout
router.post('/login',loginValidation, login);
router.post('/logout', logout);

module.exports = router;