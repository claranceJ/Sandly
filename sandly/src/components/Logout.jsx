// src/components/Logout.jsx

// Logout page logic that uses Firebase Auth and useNavigate hook
import { useEffect } from "react"; // Import React's useEffect hook for side effects
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { auth } from "../firebase"; // Import the Firebase authentication instance
import { signOut } from "firebase/auth"; // Function to sign out the user

// The Logout component for user authentication
const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      alert("User logged out successfully!"); // Alert confirmation of logout
      navigate("/login"); // Redirect to Login page after successful logout
    } catch (error) {
      alert(error.message); // Alert any errors encountered during logout
    }
  };

  // useEffect to check the user's authentication status
  useEffect(() => {
    // Automatically log out user if they're already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Redirect to Login if user is not logged in
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount to prevent memory leaks
  }, [navigate]); // Dependency array includes navigate to avoid stale closure

  // Render the logout confirmation UI
  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      {/* Container for logout confirmation message */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout} // Call handleLogout function on button click
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout; // Export the Logout component for use in other parts of the application
