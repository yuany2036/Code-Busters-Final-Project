const { successHandler } = require('../middleware/successHandlers');
const User = require('../models/userModel');

// ME handlers

exports.getMe = async (req, res) => {
  // console.log("user ->",req.user);
  successHandler(res, 200, req.user.getPublicFields());
};

exports.updateMe = async (req, res, next) => {
  try {
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
