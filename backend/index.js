require("dotenv").config({ path: './backend/.env' });  // Ensure path to .env is correct

const express = require("express");
const connectDB = require("./db");  // Import db.js from the backend folder

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI: ", process.env.MONGO_URI);  // Check if MONGO_URI is loaded correctly

// Connect to MongoDB
connectDB();

// Simple Test Route
app.get("/", (req, res) => {
  res.send("MongoDB Connection is Successful!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
