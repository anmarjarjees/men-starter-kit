/* 
CREATE EMPLOYEE:
****************
Notice that we are focusing on Mongoose (MongoDB) with Node only
*/

// STEP#1: Importing the required modules: 
// Import the mongoose module
import mongoose from 'mongoose';

/* 
CommonJS:
const mongoose = require('mongoose');
*/

// Import dotenv to load environment variables
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// STEP#2: Retrieve MongoDB URI from environment variables
// Using dotenv, the MongoDB URI is securely loaded from an .env file
const mongoURI = process.env.MONGO_URI;

// STEP#3: MongoDB connection using async/await:
// MongoDB connection using async/await based on Mongoose documentation
// either:
/*
async function main() {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');
}
*/

// or:

// MongoDB connection using async/await
async function main() {
    try {
        // Connect to MongoDB using the URI from environment variables
        await mongoose.connect(mongoURI, {
            // Ensures that the URL string parser uses the latest MongoDB version
            useNewUrlParser: true,
            // Avoids deprecation warnings related to MongoDB driver
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    }
    catch (err) {
        // Catch any connection errors and log them
        console.error('MongoDB connection error:', err);
        // Graceful Process Exit:
        process.exit(1); // Exit the process if the connection fails
    }
}

// Connect to the MongoDB database and handle any errors
main().catch(err => {
    console.error('Error during MongoDB connection:', err); // Log errors if any
    process.exit(1); // Exit the process in case of connection failure
});
/* 
To review:
*******************
> The async/await pattern ensures that the code waits for the connection to complete before moving forward.
> Using process.exit(1) ensures that if MongoDB fails to connect, the application will exit with a failure status.
> The .catch() block after main() handles any unexpected errors that might be missed inside the try block.
*/


/* 
Schema Definition:
******************
In Mongoose, everything is derived from a "Schema"

The "employeeSchema" defines the structure of the Employee documents. 
Fields like:
- employee_id
- name
- email
- position
- age
- date_hired 
all these fields are specified with their data types
Link: https://mongoosejs.com/docs/guide.html#definition
*/
// Define the schema for an Employee
// STEP#3: Define the Employee Schema
/* 
To review:
**********
> "Table" in SQL <=> "Collection" in MongoDB
> "Record" in SQL <=> "Document" in MongoDB
 
We need to define the structure of the employee document. 
This will tell MongoDB how the data should be stored for employees.
*/

// Define a Mongoose schema for the employee:        
const employeeSchema = new mongoose.Schema({
    /* 
    Data type is "String" for the "employee_id"
    When adding additional options like required, you need to use the object form:
    */
    employee_id: {
        type: String,
        // Simple required validation:
        required: true,
    },
    name: {
        type: String,
        // Below adding a custom error message :-)
        required: [true, 'Employee Name is required'],
    },
    email: {
        type: String, // String is shorthand for {type: String}
        // Email validation regex
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
    },
    age: {
        type: Number,
        required: true,
        min: [19, 'Employees age must be above 18']
    },
    date_hired: { type: Date, required: true }
});

// Optional Step for demo (mongoose docs): Add a custom method to the schema
// Mongoose NOTE: methods must be added to the schema before compiling it with mongoose.model()
employeeSchema.methods.getIntroduction = function getIntroduction() {
    const introduction = this.name
        ? `Hello, my name is ${this.name} and I am an ${this.position}`
        : `I don't have a name`;
    console.log(introduction);
};

/* 
Model Creation:
***************
Compile schema into a "model":
- It is "class" for constructing document (compiled by Schema)
- An instance of a model is called a document
- For creating and reading documents from the underlying MongoDB database.
 
Link: https://mongoosejs.com/docs/models.html
 
Below: The schema is compiled into a Employee model using mongoose.model():

model() method accepts two parameters:
- Model Name in Singular Form with PascalCase
- The Schema Object Name
*/
// Create a Mongoose model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

/* 
IMPORTANT NOTE:
Since the model is named "Employee" with PascalCase by convention, 
In other word, passing "Employee" as the first argument to model,
Mongoose will look for a collection called "employees" in the database
So "Employee" should be the singular form of "employees" collection name
which means Mongo will:
- Change the model name to plural form
- Transform it to lowercase

we can also "explicitly" define the collection name (optional):
const Employee = mongoose.model('Employee', employeeSchema, 'employees');
*/

// Document Creation: Create a new employee object to define a document
const employee = new Employee({
    employee_id: 'emp007',
    name: 'James Bond',
    email: 'jamesbond@college.com',
    position: 'Developer',
    age: 58,
    date_hired: new Date('2022-07-03')
});

// Call the custom method defined in the schema
employee.getIntroduction(); // Logs: Hello, my name is Alex Chow and I am an Instructor

/* 
Saving to Database:
*******************
Each document can be saved to the database by calling its "save()" method:
*/
// Save the employee document to MongoDB
// Either using the short way:
/*  
 await employee.save();
 console.log('Employee saved to the database.');
*/

// OR the longer way:
/*  
NOTE:
To double-check the save operation:
You can "explicitly" log the result of the save operation to see if it succeeded:
*/
await employee.save().then((doc) => {
    console.log('Employee saved:', doc);
}).catch((err) => {
    console.error('Save failed:', err);
});

/* 
Notice that database name is identified in the connection string
It was added manually by as:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
*/