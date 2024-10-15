import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import { auth } from "../firebase"; // Import the Firebase authentication instance
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods
import { useNavigate, Link } from "react-router-dom"; // Import routing hooks for navigation
import SandlyLanding from "../assets/SandlyLanding.png"; // Import the image directly for use in the component

const SignUp = () => {
  const [email, setEmail] = useState(""); // State for user email
  const [password, setPassword] = useState(""); // State for user password
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [userLoggedIn, setUserLoggedIn] = useState(false); // State to track if a user is logged in
  const navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

  // Check if the user is logged in using Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true); // If user is logged in, update state
      } else {
        setUserLoggedIn(false); // If user is not logged in, update state
      }
    });
    return unsubscribe; // Cleanup subscription on unmount to avoid memory leaks
  }, []);

  // Handle user sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading to true while processing the sign-up
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Attempt to create a user with email and password
      alert("User signed up successfully!"); // Alert user of successful sign-up
      navigate("/login"); // Redirect to login page after sign-up
    } catch (error) {
      alert(error.message); // Alert user in case of an error (consider a better UI for error display)
    } finally {
      setLoading(false); // Reset loading state after processing
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      {/* Container for image and sign-up form */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left side with the workout image */}
        <div className="hidden lg:block w-full lg:w-1/2">
          <img 
            src={SandlyLanding} // Use the imported image here
            alt="Workout"
            className="w-full h-auto object-cover" // Ensure the image covers the area properly
          />
        </div>
       
        {/* Right side with the sign-up form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSignUp}> {/* Handle form submission */}
            <div className="mb-4">
              <input
                type="email" // Input for email
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required // Make this input required
              />
            </div>
            <div className="mb-6">
              <input
                type="password" // Input for password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required // Make this input required
              />
            </div>
            <button
              type="submit" // Submit button for the form
              disabled={loading} // Disable button while loading
              className={`w-full p-3 rounded-lg transition duration-200 ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Signing Up..." : "Sign Up"} // Conditional button text based on loading state
            </button>
          </form>
          
          {/* Show login link only if user is not logged in */}
          {!userLoggedIn && ( 
            <p className="mt-4 text-center text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp; // Export the SignUp component for use in other parts of the application
