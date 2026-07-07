"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import nashikImage from "../assets/images/nashikb.png";
import {
  loginUser,
  registerUser,
  loginWithGoogle,
  loginWithGithub,
} from "../services/authService";

const ADMIN_EMAIL = "gaikwadsneh.9130@gmail.com"; 
// change this to your real admin email

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [loading, setLoading] = useState(false);

  const redirectAfterLogin = (user) => {
    const email = user?.email?.toLowerCase();

    if (email === ADMIN_EMAIL.toLowerCase()) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogin = async () => {
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const { user, error } = await loginUser(loginEmail, loginPassword);
    setLoading(false);

    if (error) {
      setLoginError(
        error.includes("auth/wrong-password")
          ? "Incorrect password."
          : error.includes("auth/user-not-found")
          ? "User not found."
          : "Login failed. Try again."
      );
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      redirectAfterLogin(user);
    }
  };

  const handleRegister = async () => {
    setRegisterError("");

    if (!signEmail || !signPassword) {
      setRegisterError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    const { user, error } = await registerUser(signEmail, signPassword, "user");
    setLoading(false);

    if (error) {
      setRegisterError(
        error.includes("auth/email-already-in-use")
          ? "This email is already registered."
          : "Registration failed. Try again."
      );
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      redirectAfterLogin(user);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError("");
    setRegisterError("");

    setLoading(true);
    const { user, error } = await loginWithGoogle();
    setLoading(false);

    if (error) {
      const message = error.includes("popup-closed-by-user")
        ? "Login canceled."
        : "Google login failed. Try again.";

      isSignUp ? setRegisterError(message) : setLoginError(message);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      redirectAfterLogin(user);
    }
  };

  const handleGithubLogin = async () => {
    setLoginError("");
    setRegisterError("");

    setLoading(true);
    const { user, error } = await loginWithGithub();
    setLoading(false);

    if (error) {
      const message = error.includes("popup-closed-by-user")
        ? "Login canceled."
        : "GitHub login failed. Try again.";

      isSignUp ? setRegisterError(message) : setLoginError(message);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      redirectAfterLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-4">
      <div className="relative w-full max-w-5xl h-[600px] flex rounded-3xl overflow-hidden shadow-2xl">
        <motion.div
          className="w-1/2 h-full"
          animate={{ x: isSignUp ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <img
            src={nashikImage}
            alt="Nashik"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="w-1/2 h-full bg-white/10 backdrop-blur-md p-10 flex flex-col justify-center"
          animate={{ x: isSignUp ? "-100%" : "0%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#0077aa]">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>

          <p className="text-slate-600 mb-5">
            {isSignUp
              ? "Create your new account"
              : "Welcome back! Please login."}
          </p>

          {!isSignUp && (
            <>
              {loginError && (
                <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
                  {loginError}
                </div>
              )}

              <input
                type="email"
                placeholder="Email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="border border-[#0077aa] rounded-lg px-5 py-3 mb-4 outline-none focus:ring-2 focus:ring-[#00aaff]"
              />

              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="border border-[#0077aa] rounded-lg px-5 py-3 mb-5 outline-none focus:ring-2 focus:ring-[#00aaff]"
              />

              <button
                onClick={handleLogin}
                disabled={loading}
                className="bg-gradient-to-r from-[#0077aa] to-[#00aaff] text-white font-semibold py-3 rounded-lg mb-4 hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Login"}
              </button>
            </>
          )}

          {isSignUp && (
            <>
              {registerError && (
                <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
                  {registerError}
                </div>
              )}

              <input
                type="email"
                placeholder="Email address"
                value={signEmail}
                onChange={(e) => setSignEmail(e.target.value)}
                className="border border-[#0077aa] rounded-lg px-5 py-3 mb-4 outline-none focus:ring-2 focus:ring-[#00aaff]"
              />

              <input
                type="password"
                placeholder="Password"
                value={signPassword}
                onChange={(e) => setSignPassword(e.target.value)}
                className="border border-[#0077aa] rounded-lg px-5 py-3 mb-5 outline-none focus:ring-2 focus:ring-[#00aaff]"
              />

              <button
                onClick={handleRegister}
                disabled={loading}
                className="bg-gradient-to-r from-[#0077aa] to-[#00aaff] text-white font-semibold py-3 rounded-lg mb-4 hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Register"}
              </button>
            </>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="border border-[#0077aa] text-[#0077aa] py-3 rounded-lg mb-3 hover:bg-[#00aaff]/20 transition disabled:opacity-50"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="border border-[#0077aa] text-[#0077aa] py-3 rounded-lg mb-5 hover:bg-[#00aaff]/20 transition disabled:opacity-50"
          >
            Continue with GitHub
          </button>

          <p className="text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-[#0077aa] font-semibold hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}