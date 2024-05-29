const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');

// POST /api/users - Create a new user
router.post('/', createUser);

// GET /api/users - Retrieve all users
router.get('/', getAllUsers);

// GET /api/users/:id - Retrieve a single user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update a user by ID
router.put('/:id', updateUserById);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', deleteUserById);

module.exports = router;
