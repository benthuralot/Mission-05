const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./db");
const AuctionItem = require("./models/AuctionItem");

dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// ✅ Unified Route: Get All Items OR Search by Keyword
app.get("/api/auction-items", async (req, res) => {
  try {
    const { search } = req.query;
    let items;

    if (search) {
      // Perform case-insensitive keyword search on title and description
      items = await AuctionItem.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      // Get all auction items if no search query is provided
      items = await AuctionItem.find();
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Server Listener
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
