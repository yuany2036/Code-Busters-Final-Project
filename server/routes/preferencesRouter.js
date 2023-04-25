const express = require('express');
const Preferences = require('../models/preferenceModel');
const router = express.Router();
const { auth } = require('../middleware/authentication');

router.route('/').post(auth,(req, res) => {
    console.log('Received preferences data:', req.body);

    // Validate preferences data
    const { bookLover, movieWatcher, genres } = req.body;
    if (typeof bookLover !== 'boolean' || typeof movieWatcher !== 'boolean' || !Array.isArray(genres)) {
        console.log('Validation failed:', { bookLover, movieWatcher, genres });
        return res.status(400).json({ error: 'Bad Request' });
    }

    // Create a new Preferences document with user ID and save it to MongoDB
    const newPreferences = new Preferences({ 
        user: req.user._id,
        bookLover, 
        movieWatcher, 
        genres 
    });
    console.log('New preferences document:', newPreferences);

    newPreferences.save()
        .then(preferences => {
            console.log('Preferences stored successfully:', preferences);
            // Send success response
            res.status(200).json({ message: 'Preferences stored successfully' });
        })
        .catch(error => {
            console.error('Failed to store preferences:', error);
            // Send error response
            res.status(500).json({ error: 'Internal Server Error' });
        });
});



module.exports = router;