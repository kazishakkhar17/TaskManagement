import '../styles/TaskUpdate.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskUpdate = () => {
  const { taskId } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch task details to pre-fill the form
  const fetchTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.slice(0,10));//setDueDate(task.dueDate.slice(0, 10)); // Extract the date part (yyyy-MM-dd)
        setPriority(task.priority);
        setCategory(task.category);
      } else {
        setError('Failed to fetch task details.');
      }
    } catch (err) {
      setError('An error occurred while fetching task.');
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  // Handle form submission to update task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const updatedTask = { title, description, dueDate, priority, category };

      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccess('Task updated successfully!');
        setError('');
        navigate('/task-list');
      } else {
        setError('Failed to update task.');
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while updating task.');
      setSuccess('');
    }
  };

  return (
    <div className="task-update-container">
      <h2>Update Task</h2>
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
        <button type="submit">Update Task</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Back to Task List Button */}
      <div className="Dashboard">
        <button onClick={() => navigate('/task-list')}>Back to Task List</button>
      </div>
    </div>
  );
};

export default TaskUpdate;
