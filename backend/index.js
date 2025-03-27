require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" Connected to MongoDB Atlas"))
.catch((err) => console.error(" MongoDB Connection Error:", err));

// Simple Test Route
app.get("/", (req, res) => {
  res.send(" MongoDB Connection is Successful!");
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
