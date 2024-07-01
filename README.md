# CRUD-
set up a basic REST API with Node.js and Express for managing "users" with CRUD operations.
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let userId = 1;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Users API');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Create a new user
app.post('/users', (req, res) => {
  const user = {
    id: userId++,
    ...req.body,
  };
  users.push(user);
  res.status(201).json(user);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  Object.assign(user, req.body);
  res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).end();
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
