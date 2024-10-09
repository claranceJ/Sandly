// src/components/PrivateRoute.jsx
// Gets users from Auth and check if users are logged in, if not redirect to login Page

import { useAuth } from "../context/AuthContext"; // This is to Import the Auth context
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // This is to Get current user from Auth context

  // If no user is logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  // Otherwise, render the children (protected content)
  return children;
};

export default PrivateRoute;
