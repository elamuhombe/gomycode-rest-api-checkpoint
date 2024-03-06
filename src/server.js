// Importing necessary modules
const express = require('express'); // Express.js framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const User = require('./models/User'); // User model schema
require('dotenv').config(); // Load environment variables from a .env file

// Initializing Express app
const app = express();
const PORT = process.env.PORT || 3000; // Set port number from environment variable or default to 3000

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB')) // Log successful connection
  .catch(err => console.error('Failed to connect to MongoDB', err)); // Log connection error if any

// Middleware to parse JSON requests
app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
  res.send("Welcome to REST API!"); // Respond with a welcome message for the root path
});

// Chain the routes for user operations
app.route('/users')
    // Route to return all users
    .get(async (req, res) => {
        try {
            const users = await User.find(); // Find all users
            res.json(users); // Respond with the list of users
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server error
        }
    })
    // Route to add a new user to the database
    .post(async (req, res) => {
        const user = new User({
            name: req.body.name, // Extract user's name from request body
            email: req.body.email, // Extract user's email from request body
            age: req.body.age // Extract user's age from request body
        });
        try {
            const newUser = await user.save(); // Save the new user to the database
            res.status(201).json(newUser); // Respond with the newly created user
        } catch (error) {
            res.status(400).json({ message: error.message }); // Handle client error
        }
    });

// Define routes for individual user operations
app.route('/users/:id')
    // Route to edit a user by ID
    .put(async (req, res) => {
        try {
            const user = await User.findById(req.params.id); // Find user by ID
            if (user == null) {
                return res.status(404).json({ message: 'User not found' }); // Respond with error if user not found
            }
            if (req.body.name != null) {
                user.name = req.body.name; // Update user's name if provided in request body
            }
            const updatedUser = await user.save(); // Save the updated user
            res.json(updatedUser); // Respond with the updated user
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server error
        }
    })
    // Route to remove a user by ID
    .delete(async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id); // Find and remove user by ID
            res.sendStatus(204); // Respond with success status
        } catch (error) {
            res.status(500).json({ message: error.message }); // Handle server error
        }
    });

// Start server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message with port number
});
