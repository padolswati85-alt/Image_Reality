// src/services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ===== EMAIL/PASSWORD =====
export const registerUser = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Email and password are required.");
    if (!isValidEmail(email)) throw new Error("Invalid email format.");
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    console.error("Register error:", error);
    return { error: error.code || error.message || "Registration failed." };
  }
};

export const loginUser = async (email, password) => {
  try {
    if (!email || !password) throw new Error("Email and password are required.");
    if (!isValidEmail(email)) throw new Error("Invalid email format.");
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.code || error.message || "Login failed." };
  }
};

// ===== GOOGLE LOGIN =====
export const loginWithGoogle = async () => {
  try {
    // Force account chooser popup
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    console.error("Google login error:", error);
    return { error: error.code || "Google sign-in failed." };
  }
};

// ===== GITHUB LOGIN =====
export const loginWithGithub = async () => {
  try {
    // Force GitHub to show account chooser
    githubProvider.setCustomParameters({
      allow_signup: true,
    });
    const result = await signInWithPopup(auth, githubProvider);
    const token = await result.user.getIdToken();
    return { user: result.user, token };
  } catch (error) {
    console.error("GitHub login error:", error);
    return { error: error.code || "GitHub sign-in failed." };
  }
};

// ===== LOGOUT =====
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: error.message || "Logout failed." };
  }
};