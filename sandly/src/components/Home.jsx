import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For handling the loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
      {user ? (
        // When the user is logged in
        <div>
          <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome, {user.email}! to SANDLY<span className="text-blue-400">NORMOUS</span>
          </h1>
          <p className="text-sm md:text-base font-light">
            Looking to feel your best? Our friendly and supportive gym <span className="text-blue-400 font-medium">community</span> is here to help you reach your fitness <span className="text-blue-400 font-medium">goals</span>. Join us and discover the joy of a healthy, active lifestyle.
          </p>
          <button className="px-8 py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200">
            <p>Accept and Begin</p>
          </button>
        </div>
      ) : (
        // When the user is not logged in, show login form
        <div>
          <h2 className="font-semibold text-2xl">Login to Your Account</h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <button type="submit" className="px-4 py-2 bg-blue-400 text-white rounded-md">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
