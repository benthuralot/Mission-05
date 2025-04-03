const yargs = require('yargs'); // Import yargs library
const connectDB = require('./db'); // Import database connection
const mongoose = require('mongoose'); // Import mongoose
const AuctionItem = require('./models/AuctionItem'); // Import AuctionItem model
const seedData = require('./data/seedData.json'); // Import seed data

connectDB(); // Connect to MongoDB

const argv = yargs
  .command('seed', 'Seed auction data into the database', {}, async () => {
    try {
      console.log(`Current Database: ${mongoose.connection.name}`);
      await AuctionItem.deleteMany(); // Clear existing data
      await AuctionItem.insertMany(seedData); // Insert new data
      const count = await AuctionItem.countDocuments();
      console.log(`Data seeded successfully! Document count: ${count}`);
    } catch (error) {
      console.error(`Error seeding data: ${error.message}`);
    } finally {
      process.exit();
    }
  })
  .command('list', 'Display all auction items', {}, async () => { 
    try {
      const items = await AuctionItem.find(); // Fetch all auction items
      console.log("Auction Items:");
      items.forEach(item => {
        console.log(`- ${item.title}: ${item.description} (Start Price: $${item.start_price}, Reserve Price: $${item.reserve_price})`);
      });
    } catch (error) {
      console.error(`Error fetching auction items: ${error.message}`);
    } finally {
      process.exit();
    }
  })
  .help()
  .argv;
