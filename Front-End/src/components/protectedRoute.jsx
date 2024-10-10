import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user?.token);
  console.log(token)
  // If there's no token, navigate to the SignupForm (or login) page
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
