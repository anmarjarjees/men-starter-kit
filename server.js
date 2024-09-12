/* 
CommonJS vs. ES Modules:
If you use import statements, 
remember to set "type": "module" in your package.json. 
This is crucial for Node.js to recognize ES module syntax.
*/

// STEP#1: Module Imports:
// 1) Import the express module to set up a web server

// CommonJS:
// const express = require('express');

// ES Module:
import express from 'express';

// 2) Import the mongoose module for working with MongoDB
// CommonJS:
// const mongoose = require('mongoose');

// ES Module:
import mongoose from 'mongoose';

// 3) Import "dotenv" for environment variables
// dotenv is used to load environment variables from the .env file into process.env

// CommonJS:
// require('dotenv').config();

// ES Module:
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
/*
The .config() function reads the .env file 
and makes its key-value pairs available in process.env

Without calling .config(), the variables from the .env file would 
not be accessible in our code

Ensure that your .env file is properly placed in the root of your project
*/

/* 
Important Note To Review:
*************************
don't forget that using "import":
will cause => SyntaxError: Cannot use import statement outside a module

Solution: modify the "package.json" file:
> "type":"module"
> Default value => "type": "commonjs",
*/

// STEP#2: Express Application Setup:
// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = 3000;

/* 
MongoDB connection string: Local vs. Cloud
*/
// MongoDB connection string (local MongoDB database example, if used locally)
// const mongoURI = 'mongodb://localhost:3000/mydatabase'; 

// MongoDB Atlas connection string (example for cloud-based MongoDB)
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// A better practice: using an environment variable for the MongoDB connection string from the .env file
const mongoURI = process.env.MONGO_URI;

// Additional step to ensure that "MONGO_URI" is set:
if (!mongoURI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1); // Exit the process with an error code
    /* 
    process.exit([code]): 
    - This method terminates the process with the specified exit code
    - If not code specified, it will exit with code 0 indicating success
    - An exit code other than 0 usually indicates an error or abnormal termination

    Link: https://nodejs.org/api/process.html#processexitcode
    */
}

/*
mongoose: Use mongoose to connect to MongoDB using the connection string
mongoose.connect() connects the app to the MongoDB database using the provided URI (mongoURI)

Link: https://mongoosejs.com/docs/index.html
*/

// MongoDB connection using async/await based on Mongoose documentation
/* 
To review:
Async/Await => is syntactic sugar over Promises
"async" is used to define an "Asynchronous Function" 
Asynchronous Function: 
- is used to handle tasks that take time (like connecting to a database) 
without stopping the rest of the program from running.
- always returns a "promise"
- is using "await" inside, async/await simplifies working with promises in a sequential way
*/

// STEP#3: MongoDB Connection:
async function main() {
    /* 
    To review:
    "await" => pauses the function until the connection to MongoDB is successful.
    so the code pauses at that point until the promise resolves

    if the promise is rejected (for any error that might occur), 
    the error is thrown and can be caught using .catch() when you call the async function.
    */
    await mongoose.connect(mongoURI);
    /* 
    mongoose.connect() is used to connect to the MongoDB database. 
    It takes a connection string (process.env.MONGO_URI), 
    which is stored in a .env file for security.

    Notice that:
    > it either successfully connects and logs the message "Connected to MongoDB Atlas"
    > or it catches errors with .catch()
    */
    console.log('Connected to MongoDB Atlas');
}

// Connect to the MongoDB database and handle any errors
main().catch(err => console.log('MongoDB connection error:', err));
/* 
To summarize:
> The main() function is async, meaning it returns a promise.
> If there's an error in the await mongoose.connect(), the promise is rejected.
> The .catch() attached to main() will handle the error, logging it with console.log(err).
*/

/* 
Alternative Connection Solution:
********************************
*/

/*
async function connectToDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

// Connect to the MongoDB database
connectToDB();
*/

// STEP#4: Routes
// Root Route ('/'): Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// STEP#5: (Additional and Optional STEP):
/* 
 To review:
 In Express.js, "middleware functions" can be categorized 
 into 2 categories:
 - General Middleware Functions
 - Error-Handling Middleware Functions

 These middleware functions have:
 ********************************
 - different signatures based on their intended use
 - different arguments:
    > general middleware functions:
    *******************************
    1- req: The request object, 
    which contains details about the HTTP request, such as headers,
    query parameters, and the request body
    2- res: The response object, 
    which is used to send responses to the client.
    3- next: A function that, when called, 
    passes control to the next middleware function in the stack. 
    If not called, the request will hang and not proceed to the next middleware or route handler.
    > error-handling middleware functions:
    **************************************
    1- err: The error object passed from the previous middleware
    or route handler. 
    This object typically contains information about the error, 
    such as the message and stack trace.
    2- req: The request object.
    3- res: The response object.
    4- next: The next function in the middleware stack. 
    This is often not used in error-handling middleware, but it's included to maintain the function signature.

 Define "error-handling middleware function"
 - It's the same as other Express middleware functions, but:
    > other middleware functions accept 3 arguments
    > error-handling middleware functions accept 4 arguments:
    - err: The error object that was passed to the middleware.
    - req: The request object. (not used in this case)
    - res: The response object.
    - next: The next middleware function in the stack (not used in this case).

 Link: https://expressjs.com/en/guide/error-handling.html
*/
app.use((err, req, res, next) => {
    /* 
     logs the error stack trace to the console
     it helps with debugging by providing detailed information about where the error occurred:
    */
    console.error(err.stack);
    /* 
     sends a response to the client with an HTTP status code of 500
     500 = Internal Server Error
     with a message indicating that something went wrong.
    */
    res.status(500).send('Something broke!');
});

// STEP#6: Starting the Server (Server Initialization)
// Start the Express server, listening on the specified port (3000)
// Logs a message when the server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});