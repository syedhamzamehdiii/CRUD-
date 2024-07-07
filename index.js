const express = require('express');
const connectDB = require('./db');
const User = require('./models/User'); // Import the User model

const app = express();
const port = 3000;

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Users API');
});

// Function to generate the next custom ID
const getNextCustomId = async () => {
  const lastUser = await User.findOne().sort({ customId: -1 });
  if (lastUser) {
    const lastId = parseInt(lastUser.customId);
    return (lastId + 1).toString();
  } else {
    return '1';
  }
};

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const nextId = await getNextCustomId();
    const user = new User({ ...req.body, customId: nextId });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ customId: req.params.id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ customId: req.params.id }, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ customId: req.params.id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
