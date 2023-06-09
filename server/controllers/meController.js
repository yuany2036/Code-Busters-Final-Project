const { successHandler } = require('../middleware/successHandlers');
const User = require('../models/userModel');
/* const cloudinary = require('cloudinary').v2; */
// ME handlers
/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.CLOUDINARY_SECRET,
}); */

exports.getMe = async (req, res) => {
  // console.log("user ->",req.user);
  successHandler(res, 200, req.user.getPublicFields());
};

exports.updateMe = async (req, res, next) => {
  try {
    /* if (req.body.avatar) {
      const result = await cloudinary.uploader.upload(req.body.avatar, {
        public_id: req.user.email.split('@')[0],
      });

      req.body.avatar = undefined;
      req.body.avatarURL =
        process.env.NODE_ENV === 'development' ? result.url : result.secure_url;
    } */
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

exports.updateUserAvatar = async (req, res, next) => {
  try {
    console.log("Request User:", req.user);
    if (!req.body.avatarURL) {
      throw new Error("Avatar URL is missing in the request.");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: req.body.avatarURL },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to update user avatar.");
    }

    console.log("Updated user:", updatedUser);

    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUserAvatar for user ID:", req.user._id, error);
    next(error);
  }
};


