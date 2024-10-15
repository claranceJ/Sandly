// Component for Fetching Exercises from WGER API
// Depending on the complexity, I may use either Fetch API or Axios

import React, { useState, useEffect } from "react";
import axios from "axios";

const ExerciseApp = () => {
  // State for storing all exercises
  const [exercises, setExercises] = useState([]);
  // State for storing details of a selected exercise
  const [exerciseDetails, setExerciseDetails] = useState(null);
  // Loading state to show when data is being fetched
  const [loading, setLoading] = useState(false);
  // Error message if something goes wrong
  const [error, setError] = useState("");
  // State for selected muscle group (e.g., Biceps, Chest)
  const [muscleGroup, setMuscleGroup] = useState("");
  // State for storing exercises based on selected muscle group
  const [muscleExercises, setMuscleExercises] = useState([]);

  // Function to fetch the list of exercises from the API
  const fetchExercises = async () => {
    setLoading(true); // Show loading while fetching
    setError(""); // Clear any previous error message

    try {
      // Make a request to get the exercises
      const response = await axios.get("https://wger.de/api/v2/exercise/");
      setExercises(response.data.results); // Assuming the API returns data in 'results'
    } catch (err) {
      setError("Failed to fetch exercises. Please try again."); // Set error if request fails
    } finally {
      setLoading(false); // Stop loading whether the request succeeds or fails
    }
  };

  // Function to fetch details for a specific exercise by its ID
  const fetchExerciseDetails = async (id) => {
    setLoading(true);
    setError("");

    try {
      // Fetch specific exercise details
      const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${id}/`);
      setExerciseDetails(response.data); // Store the details of the selected exercise
    } catch (err) {
      setError("Failed to fetch exercise details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch exercises filtered by the selected muscle group
  const fetchExercisesByMuscleGroup = async () => {
    if (!muscleGroup) return; // Do nothing if no muscle group is selected

    setLoading(true);
    setError("");

    try {
      // Make a request to get exercises based on the selected muscle group
      const response = await axios.get(`https://wger.de/api/v2/exercise/?muscle=${muscleGroup}`);
      setMuscleExercises(response.data.results);
    } catch (err) {
      setError("Failed to fetch exercises for this muscle group. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all exercises when the component first loads
  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Exercise List</h2>
      {loading && <p className="text-center">Loading exercises...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="mb-4">
        {/* Dropdown to select a muscle group */}
        <label htmlFor="muscleGroup" className="block font-medium">Search by Muscle Group:</label>
        <select
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)} // Update the muscle group state on change
          className="border border-gray-300 p-2 rounded-md w-full"
        >
          <option value="">Select a muscle group</option>
          <option value="1">Biceps</option>
          <option value="2">Triceps</option>
          <option value="3">Shoulders</option>
          <option value="4">Chest</option>
          <option value="5">Back</option>
          <option value="6">Legs</option>
        </select>
        {/* Button to trigger fetching exercises based on the selected muscle group */}
        <button 
          onClick={fetchExercisesByMuscleGroup} 
          className="mt-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Displaying the list of exercises filtered by muscle group */}
      {muscleExercises.length > 0 ? (
        <ul className="space-y-4">
          {muscleExercises.map((exercise) => (
            <li key={exercise.id} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h3 className="font-semibold text-lg">{exercise.name}</h3>
              {/* Button to view detailed information about the selected exercise */}
              <button
                onClick={() => fetchExerciseDetails(exercise.id)} // Fetch exercise details on click
                className="mt-2 bg-green-500 text-white p-2 rounded-md"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No exercises found for this muscle group.</p>
      )}

      {/* Displaying details of the selected exercise */}
      {exerciseDetails && (
        <div className="mt-8 p-4 bg-gray-200 rounded-md shadow-md">
          <h3 className="text-xl font-bold">{exerciseDetails.name}</h3>
          <p><strong>Description:</strong> {exerciseDetails.description}</p>
          <p><strong>Recommended Sets:</strong> {exerciseDetails.sets}</p>
          <p><strong>Recommended Reps:</strong> {exerciseDetails.reps}</p>
          {exerciseDetails.images && exerciseDetails.images.length > 0 && (
            <img src={exerciseDetails.images[0].image} alt={exerciseDetails.name} className="mt-2 rounded" />
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseApp;
