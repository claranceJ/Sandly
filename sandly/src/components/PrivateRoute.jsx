// src/components/PrivateRoute.jsx
import { useAuth } from "../context/AuthContext"; // Import the Auth context
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user from Auth context

  // If no user is logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  // Otherwise, render the children (protected content)
  return children;
};

export default PrivateRoute;
