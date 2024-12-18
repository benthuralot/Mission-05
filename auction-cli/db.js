// This file connects your Node.js application to MongoDB. It uses the mongoose library to connect to the database. 
// The connectDB function is an async function that connects to the database using the MONGO_URI environment variable.
// If the connection is successful, it logs a message to the console. If there is an error, it logs the error message and exits the process with an exit code of 1.

const mongoose = require('mongoose'); //Import Mongoose library
require('dotenv').config();          // Load environment variables from .env file into process.env

const connectDB = async () => { // Create an async function to connect to MongoDB
  try { // Try to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected to database: ${conn.connection.name}`); // Log successful connection
  } catch (error) { // Catch connection errors
    console.error(`Error: ${error.message}`); // Log error message
    process.exit(1);        // Stop the app if connection fails
  }
};

module.exports = connectDB; // Export this function to be used in other files
