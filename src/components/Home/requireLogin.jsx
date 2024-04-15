import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  // Check if the user is authenticated
  const token = sessionStorage.getItem('token');
  const authed = token ? true : false;

  // Render the children if authenticated, otherwise redirect to login
  return authed ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
