# MEN Starter kit
The foundational setup to start a project using MongoDB, Express, and Node.js.
This repository outlines the initial setup and essential boilerplate for building Node.js projects using the MEAN (MongoDB, Express, Angular, Node.js), MEVN (MongoDB, Express, Vue.js, Node.js), or MERN (MongoDB, Express, React, Node.js) stack.

**Common Setup Includes:**
- **Express Server:** Manages routing and HTTP requests.
- **Mongoose:** Facilitates connection and interaction with a MongoDB database.
- **Environment Variables:** Securely manages sensitive information such as database credentials.
- **Basic Server Setup:** Configures the server to listen for and respond to incoming requests..

## Step#0: Initiating the 'package.json' file (Optional)
Navigate to your project folder, then use the "npm init" command to create a "package.json" file for your application. 
- With options:
```
npm init
```
- To skip the options:
```
npm init -y
```

## Step#1: Set Up Express
1. **Install Express**:
   To get started with Express, install it by running the following command:
```
   npm install express
```

2. **Create the server.js File**:
- Unix-Based Systems (Mac OS and Linux):
```
touch server.js
```

- Windows Command Prompt:
```
echo > server.js
```

- Windows PowerShell
```
New-Item -Path . -Name "server.js" -ItemType "file"
```

- File Explorer: Alternatively, you can manually create the file through the graphical interface of Windows.

3. **Add Express Boilerplate Code to server.js**: 
Add the basic Express setup code to server.js to create a simple Express server. For example:

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
```

### Summary of File Creation Methods:
- **touch** Command: Used in Unix-based systems to create an empty file. 
Example command: 
```
touch filename
```
- echo > filename: Used in Windows Command Prompt to create a new file. Example: 
```
echo > server.js
```
- New-Item Command: Used in Windows PowerShell to create a file. Example: 
```
New-Item -Path . -Name "server.js" -ItemType "file"
```
- File Explorer: Manually creating a file through the graphical interface of Windows.

## Step#2: Set Up MongoDB
We need to set up MongoDB to store and manage data
1. Install MongoDB
    - *Local Installation*: Download and install MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community). Please refer to my lecture PDF files for more details. You can also follow the installation instructions specific to your operating system as explained in MongoDB website.
    - *Cloud Installation*: Use [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database), a cloud-based MongoDB service. This is a convenient option if you prefer not to install MongoDB locally. Also refer to my PDF files for more details.

2. Install Mongoose: Install Mongoose: Mongoose is an Object Data Modeling (ODM) library that helps you interact with MongoDB using a more structured approach.
```
npm install mongoose
```
3. Connect Your Express Server to MongoDB: Modify **server.js** file to include MongoDB connection logic. 
Add the following code to connect to MongoDB using Mongoose:

```js
const mongoose = require('mongoose');

/*
Option#1: local MongoDB database
Replace with your MongoDB connection string 
*/
// const mongoURI = 'mongodb://localhost:27017/mydatabase';

/*
Option#2: cloud MongoDB database
Replace with your MongoDB Atlas connection string
*/
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Better Solution calling the process.env variables:
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});
```

4. Use Environment Variables for Better Security: Store sensitive information, such as database credentials, in environment variables.

a- Install dotenv:
```
npm install dotenv
```

b- Create the .env File: In your project root, create a .env file and add your MongoDB connection string:
and copy the connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- Replace <username> with your MongoDB Atlas username.
- Replace <password> with the corresponding password.
- Replace <dbname> with the name of your database.

c- Load Environment Variables: Add the following line at the top of your server.js file to load the environment variables from the .env file:
```js
require('dotenv').config();
```

### MongoDB Atlas
1. Create a Cluster
  - Go to the MongoDB Atlas website and sign in or create an account.
  - Create a new cluster if you haven’t already. Follow the prompts to set up your cluster.
2. Get the Connection String
- Go to the **Database Access**, create a user with read and write access to your database.
- Go to the **Network Access**, and add your IP address to the IP Whitelist to allow connections from your machine.
- In **Clusters**, click Connect and choose "Connect Your Application" to get the connection string.

## Step#3: Run and Test Server
- Start your Express server again to ensure everything is working:
```
node server.js
```
- Check the terminal for the "Connected to MongoDB" message to confirm that the connection is successful.

# References, Resources, and Credits:
1. Node.js Official Documentation

    https://nodejs.org/en/docs/

2. Express.js Official Documentation

    https://expressjs.com/
    
3. MongoDB Atlas Documentation

    https://docs.atlas.mongodb.com/

4. Mongoose Documentation

    https://mongoosejs.com/docs/guide.html

5. dotenv Package Documentation

    https://github.com/motdotla/dotenv

6. My Repo "Express Basics"

    https://github.com/anmarjarjees/express-basics

7. My Repo "Express Node Website"

    https://github.com/anmarjarjees/express-node-website
