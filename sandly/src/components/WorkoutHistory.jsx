import { useState, useEffect } from "react";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState(""); // State for filtering by date
  const [filteredWorkouts, setFilteredWorkouts] = useState([]); // State for filtered workouts

  useEffect(() => {
    setLoading(true);
    setError("");

    // Retrieve workouts from local storage
    const storedWorkouts = JSON.parse(localStorage.getItem("workoutHistory")) || [];
    setWorkouts(storedWorkouts);

    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter workouts by date
    if (filterDate) {
      const filtered = workouts.filter(workout => workout.date === filterDate);
      setFilteredWorkouts(filtered);
    } else {
      setFilteredWorkouts(workouts);
    }
  }, [filterDate, workouts]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>

      <div className="mb-4">
        <label htmlFor="filterDate" className="block font-medium">Filter by Date:</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading workouts...</p>
      ) : filteredWorkouts.length > 0 ? (
        <ul className="space-y-4">
          {filteredWorkouts.map((workout, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <p><strong>Exercise:</strong> {workout.exercise}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Intensity:</strong> {workout.intensity}</p>
              <p><strong>Sets:</strong> {workout.sets}</p>
              <p><strong>Reps:</strong> {workout.reps}</p>
              <p><strong>Weight:</strong> {workout.weight} kg</p>
              <p><strong>Date:</strong> {workout.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts logged yet.</p>
      )}
    </div>
  );
};

export default WorkoutHistory;
