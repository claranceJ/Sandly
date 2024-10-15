import { StrictMode } from 'react'; // Import StrictMode from React for development warnings
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client for rendering the app
import App from './App.jsx'; // Import the main App component
import './index.css'; // Import global CSS styles

// Create a root for the React application and render the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* The main application component */}
  </StrictMode>,
);
