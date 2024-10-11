import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home"; 
import Main from "./pages/Main"; // Import the dashboard
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute
import ExerciseApp from "./components/ExerciseApp"; // Import the ExerciseApp

const Navbar = () => {
  const { currentUser } = useAuth(); // Get current user from Auth context

  return (
    <nav className="bg-gradient-to-r bg-slate-400 text-white py-2">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex flex-col sm:flex-row justify-center gap-10">
          <li>
            <Link to="/" className="text-white hover:text-blue-500 duration-200">
              Home
            </Link>
          </li>
          {!currentUser && ( // Show Sign Up only when the user is not logged in
            <li>
              <Link to="/signup" className="text-white hover:text-blue-500 duration-200">
                Sign Up
              </Link>
            </li>
          )}
          {!currentUser ? ( // Conditional rendering for Login/Logout based on auth state
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
          {currentUser && ( // Only show the Dashboard link if the user is signed in
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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Include the Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protect the /Main route using PrivateRoute */}
          <Route
            path="/Main"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />

          {/* Add the ExerciseApp route */}
          <Route path="/exercises" element={<ExerciseApp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
