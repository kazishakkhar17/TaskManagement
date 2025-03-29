import '../styles/CreateTask.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const handleDashboard = () => {
    
    navigate('/Dashboard'); // Redirect user to the login page using navigate
  };
  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the task data
      const taskData = {
        title,
        description,
        dueDate,
        priority,
        category,
      };

      // Send POST request to backend API to create task
      const response = await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
        },
      });

      setSuccess('Task created successfully!');
      setError('');
      // Reset form fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
      setCategory('');
    } catch (err) {
      setError('Error creating task. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
      <div className="Dashboard">
        <button onClick={handleDashboard}>Dashboard</button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
    
    
  );
};

export default CreateTask;
