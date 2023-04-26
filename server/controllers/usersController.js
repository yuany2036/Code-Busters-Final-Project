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

exports.storePreferences = async (req, res) => {
    // Validate preferences data
    const { preferences, genres } = req.body;
    if (typeof preferences !== 'string' || !['bookLover', 'movieWatcher', 'none'].includes(preferences) || !Array.isArray(genres)) {
      console.log('Validation failed:', { preferences, genres });
      return res.status(400).json({ error: 'Bad Request' });
    }
  
    // Cast the genre objects into strings
    const genreStrings = genres.map(genre => JSON.stringify(genre));
  
    // Update the user document with the new preferences
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { preferences, genres: genreStrings },
      { new: true }
    );
  
    if (!updatedUser) {
      console.log(`User with ID ${req.user._id} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
  
    console.log(`Preferences stored successfully for user ${req.user._id}`);
    res.status(200).json({ message: 'Preferences stored successfully', user: updatedUser });
  };