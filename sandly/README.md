Sandly Web Application
Table of Contents

    Project Overview
    Features
    Technologies Used
    Getting Started
    Challenges and Fixes
    Future Enhancements
    Image(Preview)
    License

Project Overview

Sandly is a modern, responsive web application built for fitness enthusiasts. Inspired by Sandy from SpongeBob, the app motivates users to stay fit by providing workout routines and tracking their progress.
Features

    User Authentication: Secure sign-up, login, and logout functionality.
    Personalized Dashboard: Users can view tailored workout routines after logging in.
    Progress Tracking: Keep track of workout completion over time.
    Responsive Design: Optimized for all screen sizes, from desktop to mobile.
    Routing with HashRouter: Ensures smooth navigation and deep linking.

Technologies Used

    Frontend:
        React.js (for building user interfaces)
        Tailwind CSS (for modern and responsive styling)
        React Router (HashRouter for navigation)
        
    Backend:
         Firebase Auth

    Build Tool: Vite (for fast and efficient development)

    Deployment: Vercel (for quick and scalable deployment)

    Additional Libraries:
        Axios (for making HTTP requests)

Getting Started
Prerequisites

Before you start, ensure you have Node.js installed on your machine. You can download it from here.
Installation

    Clone the repository:

    bash

git clone https://github.com/claranceJ/Sandly.git

Navigate to the project directory:

bash

cd Sandly

Install the required dependencies:

bash

npm install

Start the development server:

bash

    npm run dev

    Open your browser and navigate to http://localhost:3000.


Challenges and Fixes
1. Route Handling Issue (404 Errors on Page Refresh)

    Problem: The app encountered 404 errors when users refreshed the page or accessed non-root URLs directly, especially in the production environment.

    Fix: I added a vercel.json configuration file with the fallback option to ensure proper handling of client-side routing. This file ensures that non-root routes are correctly served by Vercel and imported HashRouter:


2. Loss of Authentication State on Refresh

    Problem: Users lost their authentication state after refreshing the page, forcing them to log in again.

    Fix: I implemented local storage to persist the authentication state. This ensures that users remain logged in even after a page refresh or browser close.

3. Styling Adjustments for Consistent Responsiveness

    Problem: Ensuring consistent UI experience across various screen sizes was challenging.

    Fix: I utilized Tailwind CSS to streamline responsive design, ensuring that components adapt smoothly to different screen sizes without breaking.

Future Enhancements

    Integration with External APIs: Fetch real-time fitness data and workout suggestions from external sources.
    Role-Based Access Control: Different user roles (e.g., admin, regular user) to manage content access.
    Progress Visualization: Include charts and graphs to visualize the user's fitness journey.
    Dark Mode: Implement a dark mode theme for improved user experience.
    

Image

Below is a snapshot of the Sandly Web Application:

https://imgur.com/a/ly8U5Py


This project is licensed under the MIT License. See the LICENSE file for more details.
Contributors

    Jacktone Clarance - Developer
