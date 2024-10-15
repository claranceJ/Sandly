// src/components/PrivateRoute.jsx
// This component checks if users are logged in; if not, it redirects them to the login page.

import { useAuth } from "../context/AuthContext"; // Import the Auth context to access authentication information
import { Navigate } from "react-router-dom"; // Import Navigate for redirecting the user

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from the Auth context

  // If no user is logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to the login page
  }

  // Otherwise, render the children (protected content)
  return children; // Return the protected components as the user is authenticated
};

export default PrivateRoute; // Export the PrivateRoute component for use in routing
