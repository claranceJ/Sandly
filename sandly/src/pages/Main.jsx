import WorkoutLog from "../components/WorkoutLog";
import WorkoutHistory from "../components/WorkoutHistory";



const Dashboard = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Fitness Tracker Dashboard</h1>
      <WorkoutLog />
      <WorkoutHistory />
    </div>
  );
};

export default Dashboard;
