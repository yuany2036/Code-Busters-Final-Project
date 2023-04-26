const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  storePreferences
} = require('../controllers/usersController');
const { auth } = require('../middleware/authentication');

const router = express.Router();

// Route to get all users
router.route('/')
  .get(getAllUsers);

// Routes to get, update, and delete a user by ID
router.route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

router.route("/preferences").post(auth,storePreferences)

module.exports = router;




