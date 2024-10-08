import { useState, useEffect } from "react";
import WorkoutLog from "../components/WorkoutLog";
import WorkoutHistory from "../components/WorkoutHistory";

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from localStorage on component mount
  useEffect(() => {
    const storedWorkouts = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    setWorkouts(storedWorkouts);
  }, []);

  // Function to add a new workout
  const addWorkout = (newWorkout) => {
    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem("workoutHistory", JSON.stringify(updatedWorkouts)); // Update localStorage
  };

  return (
    <div className="min-h-screen p-8 bg-slate-200">
      <h1 className="text-4xl font-bold mb-4">Fitness Tracker Dashboard</h1>
      <WorkoutLog addWorkout={addWorkout} /> {/* Pass the addWorkout function */}
      <WorkoutHistory workouts={workouts} /> {/* Pass the workouts array */}
    </div>
  );
};

export default Dashboard;
