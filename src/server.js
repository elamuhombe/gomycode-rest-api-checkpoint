const express = require('express');
const mongoose = require('mongoose');
const User= require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Chain the routes for user operations
app.route('/users')
    // Route to return all users
    .get(async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    // Route to add a new user to the database
    .post(async (req, res) => {
        const user = new User({
            name: req.body.name
        });
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

app.route('/users/:id')
    // Route to edit a user by ID
    .put(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (req.body.name != null) {
                user.name = req.body.name;
            }
            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    // Route to remove a user by ID
    .delete(async (req, res) => {
        try {
            await User.findByIdAndRemove(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});