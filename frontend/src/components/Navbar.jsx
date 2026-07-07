"use client";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, MapPin, Menu, X, LogOut, LogIn, Users } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    ["Explore Nashik", "/explore"],
    ["Inspiration", "/inspiration"],
    ["Plan a Trip", "/trip-planner"],
    ["About us", "/about"],
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 z-50">   {/* ← changed from z-[9999] to z-50 */}
      <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-black/20 transition-all duration-300">
        <Link
          to="/"
          className="flex items-center gap-3 text-white hover:scale-105 transition-transform duration-300"
        >
          <img src="/Logo.png" alt="Logo" className="w-10 h-10" />
          <span className="font-semibold text-lg md:text-xl">
            Nashik Sangam
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm md:text-base font-medium text-white">
          {navLinks.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="relative hover:text-amber-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-amber-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6 text-white">
          <Link
            to="/wishlist"
            className="relative hover:text-amber-400 transition duration-300"
          >
            <Heart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-400 text-white text-xs flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/crowd-map"
            title="Crowd Density Map"
            className="hover:text-amber-400 transition duration-300"
          >
            <Users />
          </Link>

          <Link
            to="/map"
            title="Map"
            className="hover:text-amber-400 transition duration-300"
          >
            <MapPin />
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-amber-400 hover:scale-105 text-white text-sm md:text-base transition-transform shadow-lg"
            >
              <LogIn size={16} />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm md:text-base transition-shadow shadow-lg"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-6 space-y-5 bg-black/20 backdrop-blur-xl text-white rounded-b-lg shadow-lg transition-all duration-300">
          {navLinks.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="block hover:text-amber-400 transition duration-300 font-medium"
            >
              {label}
            </Link>
          ))}

          <Link
            to="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="block hover:text-amber-400 transition duration-300 font-medium"
          >
            Wishlist
          </Link>

          <Link
            to="/map"
            onClick={() => setMobileOpen(false)}
            className="block hover:text-amber-400 transition duration-300 font-medium"
          >
            Map
          </Link>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-amber-400 hover:scale-105 text-white text-sm transition-transform shadow"
            >
              <LogIn size={16} /> Login
            </Link>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm transition-shadow shadow"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}