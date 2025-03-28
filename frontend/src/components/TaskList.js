import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigating to the update page

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <div>
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
