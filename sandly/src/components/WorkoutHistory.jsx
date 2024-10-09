//Page for showing workout History
//the workouts are being passed as props from the Logs


const WorkoutHistory = ({ workouts }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>

      {workouts.length > 0 ? (
        <ul className="space-y-4">
          {workouts.map((workout, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <p><strong>Exercise:</strong> {workout.exercise}</p>
              <p><strong>Duration:</strong> {workout.duration} minutes</p>
              <p><strong>Intensity:</strong> {workout.intensity}</p>
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
