import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home"; // Home component for the landing page

const App = () => {
  console.log("Rendering App component..."); // Debugging log

  return (
    
    <Router>
      <nav className="bg-gradient-to-r text-white py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex flex-col sm:flex-row justify-center gap-8">
            <li>
              <Link
                to="/"
                className="text-blue-400 hover:text-blue-500 duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-500 duration-200"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-500 duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="text-blue-400 hover:text-blue-500 duration-200"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Define routes for the app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
