import { useState, useEffect } from "react"; // Import React hooks
import WorkoutLog from "../components/WorkoutLog"; // Import WorkoutLog component for logging workouts
import WorkoutHistory from "../components/WorkoutHistory"; // Import WorkoutHistory component for displaying logged workouts

const Dashboard = () => {
  // State to hold the list of workouts
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from localStorage on component mount
  useEffect(() => {
    // Retrieve stored workouts from localStorage and parse them into an array
    const storedWorkouts = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    // Update the state with the stored workouts
    setWorkouts(storedWorkouts);
  }, []); // Empty dependency array ensures this runs only on mount

  // Function to add a new workout
  const addWorkout = (newWorkout) => {
    // Create a new array with the existing workouts and the new workout
    const updatedWorkouts = [...workouts, newWorkout];
    // Update the state with the new workouts array
    setWorkouts(updatedWorkouts);
    // Store the updated workouts array in localStorage
    localStorage.setItem("workoutHistory", JSON.stringify(updatedWorkouts));
  };

  return (
    <div className="min-h-screen p-8 bg-slate-200"> {/* Main container with styling */}
      <h1 className="text-4xl font-bold mb-4">Fitness Tracker Dashboard</h1> {/* Dashboard title */}
      <WorkoutLog addWorkout={addWorkout} /> {/* Render WorkoutLog component and pass addWorkout function */}
      <WorkoutHistory workouts={workouts} /> {/* Render WorkoutHistory component and pass workouts array */}
    </div>
  );
};

export default Dashboard; // Export the Dashboard component for use in other parts of the app
