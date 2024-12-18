// A schema defines the structure of your MongoDB collection (like a table in SQL).

const mongoose = require("mongoose"); // Import mongoose library

const AuctionItemSchema = new mongoose.Schema( // Create a new schema for AuctionItem
  {
    title: { type: String, required: true }, // Define the fields and their types Item title (string, required)
    description: { type: String, required: true }, // Item description (string, required)
    start_price: { type: Number, required: true }, // Starting price (number, required
    reserve_price: { type: Number, required: true }, // Reserve price (number, required)
  },
  { collection: "AuctionItem" } // Explicitly name the collection
);

module.exports = mongoose.model("AuctionItem", AuctionItemSchema); // Export the model
