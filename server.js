// STEP#1: Module Imports:
// 1) Import the express module to set up a web server
import express from 'express';

// 2) Import the mongoose module for working with MongoDB
import mongoose from 'mongoose';
/* 
CommonJS:
const mongoose = require('mongoose');
*/

// 3) Import "dotenv" for environment variables
import dotenv from 'dotenv';

// STEP#2: Load environment variables from .env file
dotenv.config();

// STEP#3: Express Application Setup:
// Create an instance of an Express application
// Initialize Express App
const app = express();

// Define the port number where the server will listen for requests
const port = process.env.PORT || 3000;
/* 
 if an environment variable PORT exists (in a production environment),
 it will be used, and if not, the app will default to port 3000
*/

// A better practice: using an environment variable for the MongoDB connection string from the .env file
// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Check if MongoDB URI exists in environment variables
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1); // Exit the process if the MONGO_URI is missing
}

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

// STEP#4: MongoDB Connection:
// MongoDB connection using async/await based on Mongoose documentation
async function main() {
    try {
        await mongoose.connect(mongoURI, {
            // Ensures that the URL string parser uses the latest MongoDB version
            // Use new URL string parser
            useNewUrlParser: true,
            // Avoids deprecation warnings related to MongoDB driver
            // Avoid deprecation warnings
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if the connection fails
    }
}

// Connect to the MongoDB database:
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

/* 
To review: express.json() 
- is middleware that parses incoming JSON in the request body.
- is needed  when you are dealing with HTTP methods that send data in the request body, 
such as POST, PUT, or PATCH
*/
// STEP#5: Middleware Setup (Handling JSON bodies)
app.use(express.json()); // Parse incoming JSON payloads
/* 
NOTE:
express.json() Middleware: 
Is added to ensure that our app can properly handle requests 
with "JSON" bodies as it's required to perform the express modifying methods:
- create (post) 
- update (put) 
- delete (delete) 
against the mongodb documents.

Without express.json(), 
Express cannot read the JSON data in req.body, 
which would make it impossible to interact with MongoDB documents 
based on the data the client is sending

Notice that "GET" method typically doesn't have a request body,
it retrieves data from the server and usually sends it back in the response.
*/

// STEP#6: Routes
// Root Route ('/'): Define a route for the root URL
app.get('/', (req, res) => {
    res.send('MongoDB, Express, and Node.js are working!');
});


// STEP#7: (Additional and Optional STEP):
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

// STEP#8: Starting the Server (Server Initialization)
// Start the Express server, listening on the specified port (3000)
app.listen(port, () => {
    // Log a message when the server is running
    console.log(`Server running at http://localhost:${port}/`);
}).on('error', (err) => {
    // Log server errors if any
    console.error('Error starting server:', err);
});