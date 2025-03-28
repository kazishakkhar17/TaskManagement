import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Login';
import CreateTask from './components/CreateTask';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskUpdate from './components/TaskUpdate'; // New TaskUpdate component
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/create-task" element={<PrivateRoute element={CreateTask} />} />
          <Route path="/task-list" element={<PrivateRoute element={TaskList} />} />
          <Route path="/task-update/:taskId" element={<PrivateRoute element={TaskUpdate} />} /> {/* New route for task update */}
          
          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
