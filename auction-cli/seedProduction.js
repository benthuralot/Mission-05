const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db'); // Reuse your database connection
const AuctionItem = require('./models/AuctionItem'); // Reuse your schema
const seedData = require('./data/seedData.json'); // Import your seed data

dotenv.config();

// Function to seed data using upsert
const seedProduction = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Connected to MongoDB for production seeding.');

    // Use upsert logic to insert or update each document
    for (const item of seedData) {
      const result = await AuctionItem.updateOne(
        { title: item.title }, // Search for an existing document with this title
        { $set: item },        // Update with new data if found
        { upsert: true }       // Insert if no match is found
      );
      console.log(`Processed item: "${item.title}", Upserted: ${result.upsertedCount > 0}`);
    }

    console.log('Production seeding completed successfully!');
  } catch (error) {
    console.error(`Error during production seeding: ${error.message}`);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
};

// Run the seeding function
seedProduction();
