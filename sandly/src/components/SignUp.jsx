import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; 
import SandlyLanding from "../assets/SandlyLanding.jpg" // Use default import for the image

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track if user is logged in
  const navigate = useNavigate(); 

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true); // User is logged in
      } else {
        setUserLoggedIn(false); // User is not logged in
      }
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User signed up successfully!");
      navigate("/login"); 
    } catch (error) {
      alert(error.message); // Consider a better UI for displaying errors
    } finally {
      setLoading(false); 
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
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading} 
              className={`w-full p-3 rounded-lg transition duration-200 ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          
          {!userLoggedIn && ( // Only show login link if the user is not logged in
            <p className="mt-4 text-center text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
