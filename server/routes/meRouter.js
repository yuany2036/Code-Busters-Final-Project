const express = require('express');

const router = express.Router();

const { getMe, updateMe, deleteMe } = require('../controllers/meController');
const { auth } = require('../middleware/authentication');

router.route('/').get(auth, getMe).patch(auth, updateMe).delete(auth, deleteMe);

module.exports = router;
