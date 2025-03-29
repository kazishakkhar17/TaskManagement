require("dotenv").config({ path: './.env' });  // Ensure path to .env is correct

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");  // Import Task model

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());  // Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));  // Parse incoming URL-encoded data

// CORS setup to allow specific frontend requests
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL if different
  methods: 'GET,POST,PUT,DELETE',
  //allowedHeaders: 'Content-Type'
  allowedHeaders: ['Content-Type', 'Authorization'],  // Add 'Authorization' here
  credentials: true,
}));

// Import and use auth routes
app.use('/auth', require('./routes/auth'));

app.use('/api/task', require('./routes/task'));

// Test route to check server health
app.get("/test", (req, res) => {
  res.send("Server is running!");
});

// Home route to check MongoDB connection status
app.get("/", (req, res) => {
  res.send("MongoDB Connection is Successful!");
});

// GET route to fetch all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();  // Retrieve all tasks from the database
    res.status(200).json(tasks);  // Send the tasks as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving tasks."
    });
  }
});

// POST route to add a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description, dueDate, priority, category, user } = req.body;

  // Validation check
  if (!title || !dueDate) {
    return res.status(400).json({ message: "title and dueDate are required" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      user // Assuming this is an ObjectId
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);  // Send the created task as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || "Some error occurred while adding the task." });
  }
});

// PUT route to update a task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;  // Get task ID from URL parameter
  const { title, description, dueDate, priority, category, completed, user } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id, // Find task by its ID
      { title, description, dueDate, priority, category, completed, user }, // Fields to update
      { new: true } // Return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);  // Send the updated task as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message || "Some error occurred while updating the task."
    });
  }
});

// DELETE route to delete a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;  // Get task ID from URL parameter

  try {
    const deletedTask = await Task.findByIdAndDelete(id);  // Find and delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });  // Return success message
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: err.message || "Some error occurred while deleting the task."
    });
  }
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  // Use URI from .env file
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(process.env.PORT || 5000, { maxHttpHeaderSize: 1e8 }, () => {
      console.log("Server is running on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit process with failure if MongoDB connection fails
  });

console.log("Mongo URI:", process.env.MONGO_URI);
