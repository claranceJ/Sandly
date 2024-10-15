// Import necessary hooks and functions from React and Firebase
import { useState } from "react"; // Hook to manage local component state
import { auth } from "../firebase"; // Importing Firebase authentication instance
import { signInWithEmailAndPassword } from "firebase/auth"; // Function to sign in users with email and password
import { useNavigate, Link } from "react-router-dom"; // Hook for navigation and Link for routing
import SandlyLanding from "../assets/SandlyLanding.png"; // Import the workout image directly

// The Login component for user authentication
const Login = () => {
  const [email, setEmail] = useState(""); // State for storing email input
  const [password, setPassword] = useState(""); // State for storing password input
  const navigate = useNavigate(); // Hook to navigate to other routes/pages

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Attempt to sign in the user with provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully!"); // Alert on successful login
      navigate("/"); // Redirect to the home page after login
    } catch (error) {
      alert(error.message); // Alert if there is an error during login
    }
  };

  // Render the login page UI
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      {/* Container for image and login form */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left side with the workout image */}
        <div className="hidden lg:block w-full lg:w-1/2">
          <img 
            src={SandlyLanding} // Use the imported image here
            alt="Workout" // Alternative text for accessibility
            className="w-full h-auto object-cover" // Ensure the image covers the area properly
          />
        </div>

        {/* Right side with the login form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleLogin}> {/* Form submission handled by handleLogin */}
            <div className="mb-4">
              <input
                type="email" // Input field for email
                placeholder="Email" // Placeholder text
                value={email} // Controlled input value
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required // Ensures the field is filled out
              />
            </div>
            <div className="mb-6">
              <input
                type="password" // Input field for password
                placeholder="Password" // Placeholder text
                value={password} // Controlled input value
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required // Ensures the field is filled out
              />
            </div>
            <button
              type="submit" // Button to submit the form
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>
          {/* Link to redirect users to the signup page if they don't have an account */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the application
