// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAy-FjJ3BiBQzjIZ3r9CVOy2VL5HjbPUMg",
  authDomain: "nashik-sangam.firebaseapp.com",
  projectId: "nashik-sangam",
  storageBucket: "nashik-sangam.firebasestorage.app",
  messagingSenderId: "1011349476942",
  appId: "1:1011349476942:web:a416d37c23bb0b8161551f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
