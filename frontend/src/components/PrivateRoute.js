import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, adminRequired = false, regularUserRequired = false, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  const userRole = localStorage.getItem('role'); // Get the user role from localStorage

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the route requires an admin and the user isn't an admin, redirect to user dashboard
  if (adminRequired && userRole !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // If the route requires a regular user and the user is an admin, redirect to admin dashboard
  if (regularUserRequired && userRole === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  // If token exists and conditions are met, render the element
  return <Element {...rest} />;
};

export default PrivateRoute;
