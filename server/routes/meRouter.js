const express = require('express');

const router = express.Router();

const { getMe, updateMe, deleteMe,updateUserAvatar } = require('../controllers/meController');
const { auth } = require('../middleware/authentication');

router.route('/').get(auth, getMe).patch(auth, updateMe).delete(auth, deleteMe);
router.route("/update-avatar").patch(auth, updateUserAvatar);

module.exports = router;
