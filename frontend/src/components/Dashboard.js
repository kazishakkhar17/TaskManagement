import '../styles/Dashboard.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/login'); // Redirect user to the login page using navigate
  };

  const userName = localStorage.getItem('username'); // You may store this when the user logs in or register

  return (
    <div className="dashboard">
      <h2>Welcome, {userName ? userName : 'User'}</h2>
      <p>This page is only accessible by authenticated users.</p>

      <div className="dashboard-actions">
        <Link to="/create-task">
          <button>Create Task</button>
        </Link>
        <Link to="/task-list">
          <button>View Tasks</button>
        </Link>
      </div>

      <div className="logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Dashboard;
