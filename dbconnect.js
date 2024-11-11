/* 
Important Note To Review:
*************************

CommonJS vs. ES Modules:
If you use import statements, 
remember to set "type": "module" in your package.json. 
This is crucial for Node.js to recognize ES module syntax.

Don't forget that using "import":
cause => SyntaxError: Cannot use import statement outside a module

Solution: modify the "package.json" file:
> "type":"module"
> Default value => "type": "commonjs",
*/

// 1) Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// 2) Import "dotenv" for environment variables
// dotenv is used to load environment variables from the .env file into process.env
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
/*
The .config() function reads the .env file 
and makes its key-value pairs available in process.env

Without calling .config(), 
the variables from the .env file would not be accessible in our code

Ensure that your .env file is properly placed in the root of your project
*/

/* 
MongoDB connection string: Local vs. Cloud:
*******************************************
MongoDB connection string (local MongoDB database example, if used locally):
> const mongoURI = 'mongodb://localhost:3000/mydatabase'; 

MongoDB Atlas connection string (example for cloud-based MongoDB)
> const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
*/

/*  
Use an environment variable for the MongoDB connection string 
from .env file to keep credentials secure
*/
// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Check if the MongoDB URI is defined in the environment variables
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1); // Exit the process if the MONGO_URI is missing
    /* 
    process.exit([code]): 
    - This method terminates the process with the specified exit code
    - If not code specified, it will exit with code 0 indicating success
    - An exit code other than 0 usually indicates an error or abnormal termination
    
    Link: https://nodejs.org/api/process.html#processexitcode
    */
}

// MongoDB Connection:
// Establish MongoDB connection using async/await (Based on Mongoose docs)
/* 
To review:
**********
"await" => pauses the function until the connection to MongoDB is successful.
so the code pauses at that point until the promise resolves

if the promise is rejected (for any error that might occur), 
the error is thrown and can be caught using .catch() when you call the async function.
*/
async function main() {
    try {
        /*
        mongoose: Use mongoose to connect to MongoDB using the connection string
        mongoose.connect() connects the app to the MongoDB database using the provided URI (mongoURI)
        
            mongoose.connect() is used to connect to the MongoDB database. 
            It takes a connection string (process.env.MONGO_URI) [Required Argument], 
            which is stored in a .env file for security.
        
            Notice that:
            > it either successfully connects and logs the message "Connected to MongoDB Atlas"
            > or it catches errors with .catch()
        
            Link: https://mongoosejs.com/docs/5.x/docs/connections.html
            Link: https://mongoosejs.com/docs/index.html
        */
        await mongoose.connect(mongoURI, {
            // Use the latest MongoDB connection settings to avoid deprecation warnings
            // Ensures that the URL string parser uses the latest MongoDB version
            useNewUrlParser: true,
            // Avoids deprecation warnings related to MongoDB driver
            useUnifiedTopology: true,
            /* 
            IMPORTANT NOTE:
            ***************
            Since Mongoose 6.x, both "useNewUrlParser" and "useUnifiedTopology" are enabled by default. 
            Unless we're using an older version of Mongoose, 
            we don't need to explicitly set them.
            */
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Graceful process exit if connection fails
        process.exit(1); // Exit the process if the connection fails
    }
}

// Connect to the MongoDB database and handle any errors
main();
/* 
To summarize/recap:
> The main() function is async, meaning it returns a promise.
> If there's an error in the await mongoose.connect(), the promise is rejected.

- useNewUrlParser: true
> To ensure that Mongoose uses the new MongoDB connection string parser 
rather than the older, deprecated one
> Link: https://mongoosejs.com/docs/5.x/docs/deprecations.html#the-usenewurlparser-option

- useUnifiedTopology: true
> To ensure that the MongoDB driver uses the new unified topology engine. The unified topology provides a more stable and efficient way of connecting to MongoDB
> Link: https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology

To read more:
Link: https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/
Link: https://mongoosejs.com/docs/5.x/docs/deprecations.html
*/