//I'm having a chellenge in fetching workout data from the API while also fetching logged workout from the local storage
// How do I display both of these simultanously??? TODO



import { useState } from "react";

const WorkoutLog = ({ addWorkout }) => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const workout = {
      exercise,
      duration,
      intensity,
      date: new Date().toLocaleDateString(),
    };

    addWorkout(workout); // Add the new workout via the prop function

    // Clear form fields
    setExercise("");
    setDuration("");
    setIntensity("");
    alert("Workout Logged Successfully!");
    setLoading(false);
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Log Your Workout</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Exercise dropdown */}
        <div>
          <label htmlFor="exercise" className="block font-medium text-gray-700">Exercise:</label>
          <select
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select an exercise</option>
            <option value="Push-ups">Push-ups</option>
            <option value="Sit-ups">Sit-ups</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Jumping Jacks">Jumping Jacks</option>
            <option value="Plank">Plank</option>
          </select>
        </div>

        {/* Duration input */}
        <div>
          <label htmlFor="duration" className="block font-medium text-gray-700">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Intensity dropdown */}
        <div>
          <label htmlFor="intensity" className="block font-medium text-gray-700">Intensity:</label>
          <select
            id="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Intensity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging Workout..." : "Log Workout"}
        </button>
      </form>
    </div>
  );
};

export default WorkoutLog;
