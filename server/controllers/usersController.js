const { isValidId, resourceNotFound } = require("../middleware/errorHandlers");
const { successHandler } = require("../middleware/successHandlers");
const User = require("../models/userModel");
const APIQueryHandler = require("../utilities/apiQueryHandler");


// Get a user by ID 
exports.getUserById = async (req, res, next) => {
    try {
        isValidId(req)
        const { id } = req.params;
        const user = await User.findById(id)
        resourceNotFound(user, "User", "get");
        successHandler(res, 200, user);
    } catch (error) {
        next(error)
    }
}

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
    try {
        isValidId(req)
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        resourceNotFound(user, "User", "update");
        successHandler(res, 200, user);
    } catch (error) {
        next(error)
    }
}

// Delete a user by ID 
exports.deleteUserById = async (req, res, next) => {
    try {
        isValidId(req)
        const user = await User.findByIdAndDelete(req.params.id)
        resourceNotFound(user, "User", "delete");
        successHandler(res, 200, user);
    } catch (error) {
        next(error)
    }
}

// Get all users. 
exports.getAllUsers = async (req, res, next) => {
    try {
        const apiQuery = new APIQueryHandler(User, req.query)
            .filterDocs()
            .sortDocs()
            .limitFields()
            .paginateDocs();

        const users = await apiQuery.query;
        successHandler(res, 200, users);
    } catch (error) {
        console.log(error)
        next(error)
    }
}
