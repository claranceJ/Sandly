// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react"; // Import necessary React hooks
import { auth } from "../firebase"; // Import Firebase authentication instance
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase method to track authentication state changes

// Create a new context for authentication
const AuthContext = createContext();

// Define the AuthProvider component, which will wrap the app and provide auth state to children
export const AuthProvider = ({ children }) => {
  // State variable to hold the current authenticated user
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect hook to set up a listener for authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes using Firebase's onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update the currentUser state when authentication state changes
      setCurrentUser(user);
    });
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Provide the currentUser state to the AuthContext provider
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} {/* Render the children components within the provider */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext); // Return the context value for easy access to currentUser
};
