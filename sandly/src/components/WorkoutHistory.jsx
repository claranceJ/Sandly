// Page for showing workout history
// The workouts are being passed as props from the Logs component

const WorkoutHistory = ({ workouts }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>

      {workouts.length > 0 ? ( // Check if there are any workouts logged
        <ul className="space-y-4">
          {workouts.map((workout, index) => ( // Map through each workout
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <p><strong>Exercise:</strong> {workout.exercise}</p> {/* Display exercise name */}
              <p><strong>Duration:</strong> {workout.duration} minutes</p> {/* Display workout duration */}
              <p><strong>Intensity:</strong> {workout.intensity}</p> {/* Display workout intensity */}
              <p><strong>Date:</strong> {workout.date}</p> {/* Display date of workout */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts logged yet.</p> // Message displayed if no workouts are found
      )}
    </div>
  );
};

export default WorkoutHistory; // Export the WorkoutHistory component for use in other parts of the application
