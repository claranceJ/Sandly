import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import necessary components from react-router-dom
import SignUp from "./components/SignUp"; // Import SignUp component
import Login from "./components/Login"; // Import Login component
import Logout from "./components/Logout"; // Import Logout component
import Home from "./components/Home"; // Import Home component
import Main from "./pages/Main"; // Import the Dashboard page
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and useAuth for authentication context
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component to protect routes
import ExerciseApp from "./components/ExerciseApp"; // Import the ExerciseApp component

// Navbar component for navigation
const Navbar = () => {
  const { currentUser } = useAuth(); // Get the current user from the Auth context

  return (
    <nav className="bg-gradient-to-r bg-slate-400 text-white py-2">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex flex-col sm:flex-row justify-center gap-10">
          <li>
            <Link to="/" className="text-white hover:text-blue-500 duration-200">
              Home
            </Link>
          </li>
          {!currentUser && ( // Show Sign Up link only when the user is not logged in
            <li>
              <Link to="/signup" className="text-white hover:text-blue-500 duration-200">
                Sign Up
              </Link>
            </li>
          )}
          {!currentUser ? ( // Conditional rendering for Login/Logout based on authentication state
            <li>
              <Link to="/login" className="text-white hover:text-blue-500 duration-200">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/logout" className="text-white hover:text-blue-500 duration-200">
                Logout
              </Link>
            </li>
          )}
          {currentUser && ( // Only show Dashboard and Exercises links if the user is signed in
            <>
              <li>
                <Link to="/Main" className="text-white hover:text-blue-500 duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-white hover:text-blue-500 duration-200">
                  Exercises
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  return (
    <AuthProvider> {/* Provide authentication context to child components */}
      <Router> {/* Wrap the application in Router for routing capabilities */}
        <Navbar /> {/* Include the Navbar for navigation */}
        <Routes> {/* Define routes for the application */}
          <Route path="/" element={<Home />} /> {/* Home route */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/logout" element={<Logout />} /> {/* Logout route */}

          {/* Protect the /Main route using PrivateRoute */}
          <Route
            path="/Main"
            element={
              <PrivateRoute>
                <Main /> {/* Render Main component if authenticated */}
              </PrivateRoute>
            }
          />

          {/* Route for the ExerciseApp */}
          <Route path="/exercises" element={<ExerciseApp />} /> {/* Exercises route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; // Export the App component for use in other parts of the application
