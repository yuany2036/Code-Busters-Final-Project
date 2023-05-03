const express = require('express');
const { addImage } = require('../services/cloudinary-setup');

const router = express.Router();

router.route('/').post(addImage);

module.exports = router;