//Component for Fetching Exercices from WGER API
// I may either use try fetch or axios depending on the complexity

import React, { useState, useEffect } from "react";
import axios from "axios";

const ExerciseApp = () => {
  const [exercises, setExercises] = useState([]); // State for storing exercises
  const [exerciseDetails, setExerciseDetails] = useState(null); // State for selected exercise details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [muscleGroup, setMuscleGroup] = useState(""); // State for selected muscle group
  const [muscleExercises, setMuscleExercises] = useState([]); // State for exercises by muscle group

  // Fetching the list of exercises
  const fetchExercises = async () => {
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await axios.get("https://wger.de/api/v2/exercise/");
      setExercises(response.data.results); // We are Assuming the API returns the data in 'results'
    } catch (err) {
      setError("Failed to fetch exercises. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetching exercise details by ID
  const fetchExerciseDetails = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${id}/`);
      setExerciseDetails(response.data); // Set details of selected exercise
    } catch (err) {
      setError("Failed to fetch exercise details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetching exercises by muscle group
  const fetchExercisesByMuscleGroup = async () => {
    if (!muscleGroup) return; // Don't fetch if no muscle group is selected

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://wger.de/api/v2/exercise/?muscle=${muscleGroup}`);
      setMuscleExercises(response.data.results);
    } catch (err) {
      setError("Failed to fetch exercises for this muscle group. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises(); // Fetch exercises on component mount
  }, []);

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Exercise List</h2>
      {loading && <p className="text-center">Loading exercises...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="mb-4">
        <label htmlFor="muscleGroup" className="block font-medium">Search by Muscle Group:</label>
        <select
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
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
        <button 
          onClick={fetchExercisesByMuscleGroup} 
          className="mt-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {muscleExercises.length > 0 ? (
        <ul className="space-y-4">
          {muscleExercises.map((exercise) => (
            <li key={exercise.id} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h3 className="font-semibold text-lg">{exercise.name}</h3>
              <button
                onClick={() => fetchExerciseDetails(exercise.id)} // Fetch details on button click
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
