// Import the useState hook from React
import { useState } from "react";

// Define the WorkoutLog component, which takes a prop named addWorkout
const WorkoutLog = ({ addWorkout }) => {
  // Initialize state variables for exercise, duration, intensity, loading, and error messages
  const [exercise, setExercise] = useState(""); // State for selected exercise
  const [duration, setDuration] = useState(""); // State for workout duration
  const [intensity, setIntensity] = useState(""); // State for workout intensity
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages

  // Define the handleSubmit function to process the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true
    setError(""); // Clear any existing error messages

    // Create a new workout object with the entered details
    const workout = {
      exercise,
      duration,
      intensity,
      date: new Date().toLocaleDateString(), // Get the current date
    };

    // Call the addWorkout function passed as a prop to add the new workout
    addWorkout(workout);

    // Clear form fields after submission
    setExercise(""); // Reset exercise state
    setDuration(""); // Reset duration state
    setIntensity(""); // Reset intensity state
    alert("Workout Logged Successfully!"); // Show a success alert
    setLoading(false); // Set loading state to false after submission
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Log Your Workout</h2>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Exercise dropdown */}
        <div>
          <label htmlFor="exercise" className="block font-medium text-gray-700">Exercise:</label>
          <select
            id="exercise"
            value={exercise} // Set the value to the exercise state
            onChange={(e) => setExercise(e.target.value)} // Update state on selection change
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required // Make this field required
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
            value={duration} // Set the value to the duration state
            onChange={(e) => setDuration(e.target.value)} // Update state on input change
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required // Make this field required
          />
        </div>

        {/* Intensity dropdown */}
        <div>
          <label htmlFor="intensity" className="block font-medium text-gray-700">Intensity:</label>
          <select
            id="intensity"
            value={intensity} // Set the value to the intensity state
            onChange={(e) => setIntensity(e.target.value)} // Update state on selection change
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required // Make this field required
          >
            <option value="">Select Intensity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit" // Button to submit the form
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging Workout..." : "Log Workout"} {/* Change button text based on loading state */}
        </button>
      </form>
    </div>
  );
};

// Export the WorkoutLog component for use in other parts of the application
export default WorkoutLog;
