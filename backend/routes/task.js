

// module.exports = router;
// routes/task.js
const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');  // Correct path

const router = express.Router();

// Create task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.user,  // Use the user ID directly (not req.user.id)
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
      console.log('Fetching tasks for user ID:', req.user); // Debugging log
  
      const tasks = await Task.find({ user: req.user }); // Ensure tasks are filtered
      console.log('Tasks found:', tasks); // Log tasks fetched
  
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Get task by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure that the task belongs to the logged-in user
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, category, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure the user can only update their own tasks
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, category, completed },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure the user can only delete their own tasks
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
