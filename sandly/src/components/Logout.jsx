// src/components/Logout.jsx

//Logout page logic that uses Firebase Auth and useNavigate hook


import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("User logged out successfully!"); // Alert confirmation
      navigate("/login"); // Redirect to Login page after logout
    } catch (error) {
      alert(error.message); // Handle any logout errors
    }
  };

  useEffect(() => {
    // Automatically log out user if they're already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login"); // Redirect to Login if user is not logged in
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Logout</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
