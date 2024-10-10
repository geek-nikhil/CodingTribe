const express = require('express');
const app = express();
const port = 3000;
const routes = require('./Routes/routes');
const db = require('./db'); // Assuming this establishes a connection to a database
const cors = require('cors');
const userRoutes = require('./Routes/User'); // Changed variable name for clarity
const { jwtAuthMiddleware ,generateToken} = require('./jwt');

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Registering routes
app.use('/activity',jwtAuthMiddleware, routes); // Handles activity-related routes
app.use('/', userRoutes); // Handles user-related routes (prefix updated to be more descriptive)

// Basic API Example
app.get('/hi', (req, res) => {
  res.send('Welcome to the API server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
