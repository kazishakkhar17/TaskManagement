import '../styles/TaskList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterPriority, setFilterPriority] = useState('all'); // For filtering by priority
  const [filterCategory, setFilterCategory] = useState('all'); // For filtering by category
  const [sort, setSort] = useState('dueDate'); // Default sort by due date

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setTasks(response.data);
      } else {
        setError('Failed to load tasks.');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks.');
    } finally {
      setLoading(false);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        setError('Failed to delete task.');
      }
    } catch (err) {
      setError('An error occurred while deleting task.');
    }
  };

  // Mark as Completed
  const handleToggleComplete = async (taskId, completed) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        { completed: !completed }, // Toggle completed status
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setTasks(tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !completed } : task
        ));
      } else {
        setError('Failed to update task.');
      }
    } catch (err) {
      setError('An error occurred while updating task.');
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterPriorityChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Apply filtering and sorting
  const sortedTasks = tasks
    .filter((task) => (filterPriority === 'all' ? true : task.priority === filterPriority))
    .filter((task) => (filterCategory === 'all' ? true : task.category === filterCategory))
    .sort((a, b) => {
      if (sort === 'priority') {
        const priorities = { low: 1, medium: 2, high: 3 };
        return priorities[a.priority] - priorities[b.priority];
      } else if (sort === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  useEffect(() => {
    fetchTasks();

    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="task-list-container">
      <h2>Your Tasks</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Filter Section */}
      <div className="filter-sort">
        <select value={filterPriority} onChange={handleFilterPriorityChange}>
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select value={filterCategory} onChange={handleFilterCategoryChange}>
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
        </select>

        <select value={sort} onChange={handleSortChange}>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {sortedTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {sortedTasks.map((task) => (
            <li key={task._id} className={task.completed ? "completed-task" : ""}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Category: {task.category || 'Uncategorized'}</p>
              <p>Status: {task.completed ? "Completed" : "Pending"}</p>
              <div>
                <button onClick={() => handleToggleComplete(task._id, task.completed)}>
                  {task.completed ? "Mark as Pending" : "Mark as Completed"}
                </button>
                <Link to={`/task-update/${task._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
