import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import CreateTask from './components/CreateTask';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskUpdate from './components/TaskUpdate';
import AdminDashboard from './components/AdminDashboard'; // New AdminDashboard component
import PrivateRoute from './components/PrivateRoute'; // For protecting routes
import Navbar from './components/Navbar'; // Importing Navbar component
import Footer from './components/Footer'; // Importing Navbar component

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar is displayed on all pages if the user is logged in */}
        <Navbar />
        
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} regularUserRequired={true} />} />
          <Route path="/create-task" element={<PrivateRoute element={CreateTask} regularUserRequired={true} />} />
          <Route path="/task-list" element={<PrivateRoute element={TaskList} regularUserRequired={true} />} />
          <Route path="/task-update/:taskId" element={<PrivateRoute element={TaskUpdate} regularUserRequired={true} />} />

          {/* Admin protected route */}
          <Route path="/admin-dashboard" element={<PrivateRoute element={AdminDashboard} adminRequired={true} />} />

          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Auth />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
