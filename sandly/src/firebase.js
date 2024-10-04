// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration (replace with your project's credentials from the Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBISOjkjX1hMPdPJObQATwgk4y5Y_BA2qs",
  authDomain: "sandly-a539f.firebaseapp.com",
  projectId: "sandly-a539f",
  storageBucket: "sandly-a539f.appspot.com",
  messagingSenderId: "728262250766",
  appId: "1:728262250766:web:80d10d0b72b58c013d475f"
  // measurementId: "G-LWQBPGH5NZ"//
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication module
export const auth = getAuth(app);
