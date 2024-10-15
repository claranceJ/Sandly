// src/components/Home.jsx

// Import necessary hooks and functions from React and Firebase
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Importing Firebase authentication instance
import { onAuthStateChanged } from "firebase/auth"; // This function checks the user's authentication state
import { useNavigate } from "react-router-dom"; // Helps us navigate to other routes/pages

// This is the Home component which displays only if the user is logged in
const Home = () => {
  const [user, setUser] = useState(null); // State to store the logged-in user info
  const navigate = useNavigate(); // Hook for navigation to different pages

  // useEffect will run when the component mounts (loads onto the page)
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // If there is no user logged in, redirect to the login page
      if (!currentUser) {
        navigate("/login");
      } else {
        // If the user is logged in, store their details in the 'user' state
        setUser(currentUser);
      }
    });

    // Cleanup function to unsubscribe from the auth listener when the component unmounts
    return () => unsubscribe(); 
  }, [navigate]); // Dependency array with 'navigate' to ensure the hook works correctly when 'navigate' changes

  // Render the content for the page
  return (
    <div>
      {user ? ( // If a user is logged in, show the page content
        <div className="min-h-screen flex flex-col items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
          <div className="flex flex-col gap-4">
            {/* Display the user's email and a welcome message */}
            <h1 className="gap-4 uppercase gap-3  font-semibold text-xs sm:text-xs md:text-xs lg:text-xs py-8">
              You have logged in as, <span className="text-blue-400">{user.email}! </span>
            </h1>

            {/* Heading for the fitness brand "SANDLYNORMOUS" */}
            <h1 className="gap-4 uppercase gap-3 font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-8">
              SANDLY<span className="text-blue-400">NORMOUS</span>
            </h1>
          </div>

          {/* Short description of the gym's services */}
          <div>
            <p className="text-sm md:text-base font-light py-6">
              Looking to feel your best? Our friendly and supportive gym{" "}
              <span className="text-blue-400 font-medium">community</span> is here to help you reach your fitness{" "}
              <span className="text-blue-400 font-medium">goals</span>. With personalized training, join and track your workouts, the joy of a healthy, active lifestyle.
            </p>
          </div>

          {/* Prompt to encourage the user to track their workouts */}
          <h2 className="text-lg font-medium py-4">Track your workouts and view your progress</h2>

          {/* Button that redirects the user to the main workout tracking page */}
          <button className="px-8 my-8 py-4 rounded-md border-[2px] bg-slate-200 border-blue-400 border-solid blueShadow duration-200"
          onClick={() => navigate("/Main")} > {/* When clicked, this will navigate to the 'Main' page */}
            <p>Accept and Begin</p>
          </button>
        </div>
      ) : (
        // If no user is logged in, show a loading message
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Home; // Export the Home component to be used in other parts of the app
