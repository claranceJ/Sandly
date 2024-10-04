// src/components/Home.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-slate-500flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4">
          <div className="flex flex-col gap-4">
            <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome, {user.email}! to SANDLY<span className="text-blue-400">NORMOUS</span>
            </h1>
          </div>

          <div>
            <p className="text-sm md:text-base font-light">
              Looking to feel your best? Our friendly and supportive gym{" "}
              <span className="text-blue-400 font-medium">community</span> is here to help you reach your fitness{" "}
              <span className="text-blue-400 font-medium">goals</span>. With a variety of classes, state-of-the-art equipment, and personalized training, join us and discover the joy of a healthy, active lifestyle.
            </p>
          </div>

          <button className="px-8 py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200">
            <p>Accept and Begin</p>
          </button>
          
          <h2 className="text-lg font-medium mt-4">Track your workouts and view your progress below:</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
