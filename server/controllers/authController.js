const User = require("../models/userModel");
require("dotenv").config();
const {
    authError,
    duplicateFieldsHandler
} = require("../middleware/errorHandlers");
const createError = require("http-errors");
const {
    successHandler
} = require("../middleware/successHandlers");

// Create a new User
exports.createUser = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password
        } = req.body;

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        user.save();

        const token = user.generateAuthToken();

        res.cookie("jwt", token, {
            expiresIn: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
        });
        successHandler(res, 201, {
            user,
            token
        });
    } catch (error) {
        console.log('err', error);
        if (error.code === 11000) {
            return next(duplicateFieldsHandler(error.keyValue));
        }
        next(createError(400, "Invalid input data. Please check your input and try again."));
    }
};

// User Login
exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.findOne({
            email
        });

        if (!user || !(await user.checkPassword(password, user.password))) {
            return authError('Invalid email password combination');
        }

        const token = user.generateAuthToken();

        // successHandler(res, 201, user);
        res.cookie('jwt', token, {
            expiresIn: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });
        successHandler(res, 201, user);
    } catch (error) {
        next(error);
    }
};

// User Logout
exports.logout = async (req, res, next) => {
    try {
        // clear cookies
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        successHandler(res, 201, 'Logged out successfully');
    } catch (error) {
        next(error);
    }
};