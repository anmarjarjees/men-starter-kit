// 1) Import the mongoose module for working with MongoDB
import mongoose from 'mongoose';

// 2) Import "dotenv" for environment variables
// dotenv is used to load environment variables from the .env file into process.env
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
/*
The .config() function reads the .env file 
and makes its key-value pairs available in process.env
*/

// A better practice: using an environment variable for the MongoDB connection string from the .env file
// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Check if MongoDB URI exists in environment variables
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1); // Exit the process if the MONGO_URI is missing
}

// STEP#3: MongoDB Connection:
// MongoDB connection using async/await based on Mongoose documentation
async function main() {
    try {
        await mongoose.connect(mongoURI, {
            // Ensures that the URL string parser uses the latest MongoDB version
            useNewUrlParser: true,
            // Avoids deprecation warnings related to MongoDB driver
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Graceful Process Exit:
        process.exit(1); // Exit the process if the connection fails
    }
}

// Connect to the MongoDB database and handle any errors
main();
/* 
To summarize:
> The main() function is async, meaning it returns a promise.
> If there's an error in the await mongoose.connect(), the promise is rejected.
*/