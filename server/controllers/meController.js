const cloudinary = require('cloudinary').v2;
const { successHandler } = require('../middleware/successHandlers');
const User = require('../models/userModel');

//! cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ME handlers

exports.getMe = async (req, res, next) => {
  // console.log("user ->",req.user);
  successHandler(res, 200, req.user.getPublicFields());
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.avatar) {
      const result = await cloudinary.uploader.upload(req.body.avatar, {
        public_id: req.user.email.split('@')[0],
      });

      req.body.avatar = undefined;
      req.body.avatarURL =
        process.env.NODE_ENV === 'development' ? result.url : result.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    successHandler(res, 200, user.getPublicFields());
  } catch (error) {
    next(error);
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    successHandler(res, 200, { userDeleted: user.email });
  } catch (error) {
    next(error);
  }
};
