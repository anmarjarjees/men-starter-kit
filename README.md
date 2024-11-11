# MEN Starter kit
The foundational setup to start a project using MongoDB, Express, and Node.js.
This repository outlines the initial setup and essential boilerplate for building Node.js projects using the MEAN (MongoDB, Express, Angular, Node.js), MEVN (MongoDB, Express, Vue.js, Node.js), or MERN (MongoDB, Express, React, Node.js) stack.

**Common Setup Includes:**
- **Express Server:** Manages routing and HTTP requests.
- **Mongoose:** Facilitates connection and interaction with a MongoDB database.
- **Environment Variables:** Securely manages sensitive information such as database credentials.
- **Basic Server Setup:** Configures the server to listen for and respond to incoming requests..

You need to prepare your MongoDB ATLAS 
- Cluster Name
- Create  Database/Collections (Atlas Cloud)
- Defining Mongoose Schemas and Models
- Preparing Environment Variables
- Run and test Server Setup

# MongoDB Atlas:
1. Create a Cluster
  - Go to the MongoDB Atlas website and sign in or create an account (if you don't have). Check my PDF files. 
  - Create a new cluster if you haven't already. Follow the prompts to set up your cluster.
2. Get the Connection String
  - Go to the **Database Access**, create a user with read and write access to your database.
  - Go to the **Network Access**, and add your IP address to the IP Whitelist to allow connections from your machine.
  - In **Clusters**, click Connect and choose "Connect Your Application" to get the connection string.

# Project Setup:
This section covers the initial steps to install the required tools and prepare the project:

### Step#1: Initiating the 'package.json' file
Navigate to your project folder, then use the "npm init" command to create a "package.json" file for your application. 
- With options:
```
npm init
```
- To skip the options:
```
npm init -y
```

### Step#2: Set Up Express
1. **Install Express**:
   To get started with Express, install it by running the following command:
```
   npm install express
```

### Step#3: Installing the "dotenv":
Use Environment Variables for Better Security: Store sensitive information, such as database credentials, in environment variables:
```
npm install dotenv
```

### Step#4: Installing mongoose
```
npm install mongoose
```

### Step#5: Creating the server JavaScript file:
By conventions, file name could be:
- server.js
- app.js
- index.js

By using any from the following methods:
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
- File Explorer: Manually create the file through the graphical interface of Windows or the Explorer panel of VScode (any code editor).

### Step#6: Set Up MongoDB
We need to set up MongoDB to store and manage data
1. Install MongoDB
    - *Local Installation*: Download and install MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community). Please refer to my lecture PDF files for more details. You can also follow the installation instructions specific to your operating system as explained in MongoDB website.
    - *Cloud Installation*: Use [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database), a cloud-based MongoDB service. This is a convenient option if you prefer not to install MongoDB locally. Also refer to my PDF files for more details.


### Step#7: Create the .env File:
In your project root, create a **".env"** file and add your MongoDB connection string:
You can copy the connection string from MongoDB dashboard (Please refer to my in-class comprehensive PDF files):
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```
- Replace <username> with your MongoDB Atlas username.
- Replace <password> with the corresponding password.
- Replace <dbname> with the name of your database.
- cluster0 => is the default name or could be any other custom name

### Step#8: Start with coding :-)
Refer to the **server.js** file code and comments

### Step#9: Run and Test Server
- Start your Express server again to ensure everything is working:
```
node server.js
```
- Check the terminal for the "Connected to MongoDB" message to confirm that the connection is successful.

**NOTES:**

- we can install all in one command:
```
npm install mongoose dotenv express
```

- According to what we covered before, we should also install ["nodemon"](https://www.npmjs.com/package/nodemon) as a development dependency (check our in-class code examples or my Express repos):
```
npm install --save-dev nodemon
```

Then modify the "script" option in the package.json file:
```
"scripts": {
    "dev": "nodemon server.js"
}
```

Or by convention, we should use "start":
```
"scripts": {
    "start": "nodemon server.js"
}
```

For running:
> npm start server
OR (if you already specified the file name):
> npm start

**We can now proceed with CRUD operations**

# Project Files Sequence:
Please follow the following order when reading the code:
### File1: dbconnect.js - MongoDB Connection File
This file is primarily responsible for establishing the connection to the MongoDB database using Mongoose.

### File2: create.js - Simple create without Express
For creating/adding a new document to a mongodb collection

### File3: server.js - MongoDB Connection with Full Express Template
This file is primarily responsible for establishing the connection to the MongoDB database using Node, Express, and Mongoose.

- Adding the Express Template contents
- Adding the Environment Variable file with the required code for .env and in the server file
- Adding the initial code for "mongoose" besides Express template and .ENV variable as shown below:

# Our Atlas MongoDB Information:
- database: abc-college
- collection: "employees"
- one document sample:
```
{
  "_id": "6685c1acc3ce6380ffdd0004",
  "employee_id": "emp123",
  "name": "Alex Chow",
  "email": "alex@college.com",
  "position": "Instructor",
  "age": 58,
  "date_hired": "2023-07-03"
}
```

# References, Resources, and Credits:
1. [Node.js Official Documentation](https://nodejs.org/en/docs/)

2. [Express.js Official Documentation](https://expressjs.com/)
    
3. [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

4. [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)

5. [dotenv Package Documentation](https://github.com/motdotla/dotenv)

6. [My Repo "Starting with Node"](https://github.com/anmarjarjees/node.js-start)

7. [My Repo "Express Basics"](https://github.com/anmarjarjees/express-basics)

8. [My Repo "Express Node Website"](https://github.com/anmarjarjees/express-node-website)
  
9. [Jesse Hall - Senior Developer Advocate-Texas](https://www.mongodb.com/developer/author/jesse-hall/)