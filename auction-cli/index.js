// This file brings everything together and creates a simple Command-Line Interface (CLI) using the yargs library.

const yargs = require('yargs'); // Import yargs library
const connectDB = require('./db'); // Import connectDB function from db.js
const mongoose = require('mongoose'); // Import mongoose library
const AuctionItem = require('./models/AuctionItem'); // Import AuctionItem model
const seedData = require('./data/seedData.json'); // Import seed data from seedData.json

connectDB(); // Connect to MongoDB

const argv = yargs // Create a new yargs instance
  .command('seed', 'Seed auction data into the database', {}, async () => { // Create a seed command
    try {
      console.log(`Current Database: ${mongoose.connection.name}`); // Log the current database name
      await AuctionItem.deleteMany(); // Clear existing data
      await AuctionItem.insertMany(seedData); // Insert new data
      const count = await AuctionItem.countDocuments(); // Count the number of documents
      console.log(`Data seeded successfully! Document count: ${count}`); // Log success message
    } catch (error) {
      console.error(`Error seeding data: ${error.message}`);
    } finally {
      process.exit(); // Exit the process
    }
  })
  .help() // Add help command
  .argv; // Parse the arguments
