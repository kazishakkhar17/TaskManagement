// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//   taskName: { type: String, required: true },
//   description: { type: String },
//   assignedTo: { type: String, required: true },
//   dueDate: { type: Date, required: true },
//   status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Task', taskSchema);


// models/Task.js
const mongoose = require('mongoose');

// Create a schema for Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
