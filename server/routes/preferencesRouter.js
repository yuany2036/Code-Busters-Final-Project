const express = require('express');
const { auth } = require('../middleware/authentication');
const { storePreferences } = require('../controllers/preferencesController');

const router = express.Router();
router.route('/').post(auth, storePreferences);

module.exports = router;
