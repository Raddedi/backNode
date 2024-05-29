const User = require("../models/user");

// Controller for creating a new user
const createUser = async (req, res) => {
  try {
    const { firstName,lastName, email, age, roles, password, phoneNumber } = req.body;
    const newUser = new User({ firstName,lastName, email, age, roles, password, phoneNumber });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Error creating user", message: error.message });
  }
};

// Controller for retrieving all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users", message: error.message });
  }
};

// Controller for retrieving a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user", message: error.message });
  }
};

// Controller for updating a user by ID
const updateUserById = async (req, res) => {
  try {
    const { firstName,lastName, email, age, roles, password, phoneNumber } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName,lastName, email, age, roles, password, phoneNumber },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", message: error.message });
  }
};

// Controller for deleting a user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
