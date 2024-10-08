import { useState, useEffect } from "react";

const WorkoutLog = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("https://wger.de/api/v2/exercise/");
        const data = await response.json();
        setExercises(data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exercises.");
      }
    };

    fetchExercises();
  }, []);

  const fetchExerciseDetails = async (id) => {
    try {
      const response = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}/`);
      const data = await response.json();
      setExerciseDetails(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exercise details.");
    }
  };

  const handleExerciseChange = (e) => {
    const selectedExercise = e.target.value;
    setExercise(selectedExercise);
    const selectedExerciseObj = exercises.find((ex) => ex.name === selectedExercise);
    if (selectedExerciseObj) {
      fetchExerciseDetails(selectedExerciseObj.id); // Fetch details for the selected exercise
    }
  };

  const handleMuscleGroupChange = async (e) => {
    const selectedMuscleGroup = e.target.value;
    setMuscleGroup(selectedMuscleGroup);
    
    // Update exercises based on selected muscle group
    try {
      const response = await fetch(`https://wger.de/api/v2/exercise/?muscle=${selectedMuscleGroup}`);
      const data = await response.json();
      setExercises(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exercises for the selected muscle group.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(""); // Reset error state

    const workout = {
      exercise,
      duration,
      intensity,
      date: new Date().toLocaleDateString(),
    };

    console.log("Workout to be logged:", workout); // Replace with API call to your backend

    // Clear form
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
        <div>
          <label htmlFor="muscleGroup" className="block font-medium text-gray-700">Muscle Group:</label>
          <select
            id="muscleGroup"
            value={muscleGroup}
            onChange={handleMuscleGroupChange}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Muscle Group</option>
            <option value="1">Biceps</option>
            <option value="2">Triceps</option>
            <option value="3">Shoulders</option>
            <option value="4">Back</option>
            <option value="5">Chest</option>
            <option value="6">Legs</option>
            {/* Add more muscle groups as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="exercise" className="block font-medium text-gray-700">Exercise:</label>
          <select
            id="exercise"
            value={exercise}
            onChange={handleExerciseChange}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select an Exercise</option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.name}>{ex.name}</option>
            ))}
          </select>
        </div>

        {exerciseDetails && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Exercise Details:</h3>
            <p>{exerciseDetails.description}</p>
            <div className="mt-2">
              <img
                src={exerciseDetails.images[0]?.image}
                alt={exerciseDetails.name}
                className="w-32 h-32 object-cover" // Adjust width and height as needed
              />
            </div>
            <p>Recommended Sets: {exerciseDetails.reps}</p>
            <p>Recommended Reps: {exerciseDetails.sets}</p>
          </div>
        )}

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
