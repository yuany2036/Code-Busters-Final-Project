const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/usersController');

const router = express.Router();

// Route to get all users
router.route('/')
  .get(getAllUsers);

// Routes to get, update, and delete a user by ID
router.route('/:id')
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;




