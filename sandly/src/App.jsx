// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home"; // TODO We'll create this Home component for the landing page

const App = () => {
  return (
    <Router>
   
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </ul>
            </nav>

     
    </Router>
  );
};

export default App;
