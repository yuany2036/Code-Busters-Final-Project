const { check, body, validationResult } = require('express-validator');
const createError = require('http-errors');

exports.validateUser = [
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2 })
        .withMessage('First name should be at least 2 characters long')
        .isAlpha()
        .withMessage('First name should only contain letters'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2 })
        .withMessage('Last name should be at least 2 characters long')
        .isAlpha()
        .withMessage('Last name should only contain letters'),
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 4 })
        .withMessage('Username should be at least 4 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                field: error.param,
                error: error.msg,
            }));

            return res.status(422).json({ errors: errorMessages });
        }

        return next();
    },
];

exports.sanitizeUser = [
    check('firstName').trim().escape(),
    check('lastName').trim(),
    check('username').trim(),
    check('email').trim().normalizeEmail(),
    check('password').trim(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                field: error.param,
                error: error.msg,
            }));

            return next(createError(422, { errors: errorMessages }));
        }

        return next();
    },
];

exports.loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password should be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                field: error.param,
                error: error.msg,
            }));

            return res.status(422).json({ errors: errorMessages });
        }

        return next();
    },
];