import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
