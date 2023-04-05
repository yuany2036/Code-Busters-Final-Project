const createError = require('http-errors');
const { default: mongoose } = require('mongoose');

exports.routeNotFound = (req, res, next) => {
    const url = `http://localhost:8000${req.originalUrl}`;
    const message = `Route not found: ${url}`;
    const error = createError(404, message);
    res.status(error.status).json({
        statusCode: error.status,
        status: "Fail",
        message: error.message
    });
};

exports.duplicateFieldsHandler = (keyValue) => {
    const field = Object.keys(keyValue)[0];
    return createError(400, `${field} already exists`);
};

exports.isValidId = (req) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError(400, `Invalid ID: ${id}`);
    }
};

exports.resourceNotFound = (resourceName, documentName, action) => {
    const message = `Cannot ${action} ${documentName}, ${resourceName} not found`;
    if (!resourceName) {
        throw createError(404, message);
    }
};

exports.authError = (message) => {
    throw createError(401, message);
};

exports.globalErrorHandler = (err, req, res, next) => {
    const { status = 500, statusCode = status, message, stack } = err;
    const statusType = status === 404 ? "fail" : "error";
    res.status(status).json({ statusCode, status: statusType, message, stack });
};