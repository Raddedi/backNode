const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  roles: { type: [String], default: ["user"] }, // Array of strings for roles, default to 'user'
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
