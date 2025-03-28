import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Add Navigate here
import Login from './components/Login';  
import Dashboard from './components/Dashboard'; 
import CreateTask from './components/CreateTask'; 
import TaskList from './components/TaskList'; 
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/create-task" element={<PrivateRoute element={CreateTask} />} />
        <Route path="/task-list" element={<PrivateRoute element={TaskList} />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
