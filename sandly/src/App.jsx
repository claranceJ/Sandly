// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home"; 
import Main from "./pages/Main"; // Import the dashboard
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider

const Navbar = () => {
  const { currentUser } = useAuth(); // Get current user from Auth context

  return (
    <nav className="bg-gradient-to-r text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex flex-col sm:flex-row justify-center gap-8">
          <li>
            <Link to="/" className="text-blue-400 hover:text-blue-500 duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-blue-400 hover:text-blue-500 duration-200">
              Sign Up
            </Link>
          </li>
          {!currentUser ? ( // Conditional rendering based on auth state
            <li>
              <Link to="/login" className="text-blue-400 hover:text-blue-500 duration-200">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/logout" className="text-blue-400 hover:text-blue-500 duration-200">
                Logout
              </Link>
            </li>
          )}
          <li>
            <Link to="/Main" className="text-blue-400 hover:text-blue-500 duration-200">
              Dashboard
            </Link>
          </li>
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
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
