// Load environment variables from .env file
// dotenv is used to load environment variables from the .env file into process.env
require('dotenv').config();
/*
The .config() function reads the .env file 
and makes its key-value pairs available in process.env

Without calling .config(), the variables from the .env file would 
not be accessible in our code
*/

// Import the express module to set up a web server
const express = require('express');

// Import the mongoose module for working with MongoDB
const mongoose = require('mongoose');

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = 3000;

// MongoDB connection string:
// MongoDB connection string (local MongoDB database example, if used locally)
// const mongoURI = 'mongodb://localhost:3000/mydatabase'; 

// MongoDB Atlas connection string (example for cloud-based MongoDB)
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// A better practice: using an environment variable for the MongoDB connection string from the .env file
const mongoURI = process.env.MONGO_URI;

/*
mongoose: Use mongoose to connect to MongoDB using the connection string
mongoose.connect() connects the app to the MongoDB database using the provided URI (mongoURI)
Options: 
 -useNewUrlParser 
 - useUnifiedTopology 
are both recommended for modern MongoDB connections

The options { useNewUrlParser: true, useUnifiedTopology: true } ensure the latest 

Connection behaviors are used, making the connection more stable and compatible with modern MongoDB.
*/
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*
Event listener to log when the MongoDB connection is successful
mongoose.connection.on('connected') is an event listener that runs 
when the connection to MongoDB is successful.
It logs a message to the console confirming the connection to MongoDB Atlas.
*/
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

/*  
Event listener to log any connection errors
mongoose.connection.on('error') listens for any connection errors.
If an error occurs during the connection, it logs the error message to the console.
*/
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Define a route for the root URL ('/') that sends a "Hello, world!" response
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the Express server, listening on the specified port (3000)
// Logs a message when the server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});