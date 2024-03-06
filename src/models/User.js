// Import mongoose library
const mongoose = require('mongoose');

// Create a schema for the User model
const userSchema = new mongoose.Schema({
  // Define a field for the user's name
  name: {
    type: String, // Data type for name is String
    required: true // Name is required
  },
  // Define a field for the user's email
  email: {
    type: String, // Data type for email is String
    required: true, // Email is required
    unique: true // Email must be unique
  },
  // Define a field for the user's age
  age: {
    type: Number, // Data type for age is Number
    required: true // Age is required
  }
});

// Create a User model based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
