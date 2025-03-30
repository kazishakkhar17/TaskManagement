import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="#" className="navbar-logo">
          Secure Task Management System
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/task-list" className="navbar-link">Tasks</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create-task" className="navbar-link">Create Task</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
