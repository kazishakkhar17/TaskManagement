import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // Adding loading state

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200) {  // Checking if the response is successful
        setTasks(response.data);
      } else {
        setError('Failed to load tasks.');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks.');
    } finally {
      setLoading(false);  // Set loading to false when the request is complete
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Cleanup function to cancel any ongoing API request if the component unmounts
    return () => {
      setLoading(false);  // Prevent setting state if the component unmounts
    };
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;  // Show loading state
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
