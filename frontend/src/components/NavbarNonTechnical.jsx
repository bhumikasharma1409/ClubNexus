import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavbarNonTechnical({ page }) {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-600 via-red-700 to-red-900 shadow-lg px-10 py-6 flex items-center justify-between z-30">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center space-x-2">
        {/* Use image from /public folder */}
        <img src="/logo.png" alt="ClubNexus Logo" className="h-14 w-auto" />
      </Link>

      {/* Center: Menu */}
      <ul className="flex space-x-14 text-lg font-semibold font-serif text-white absolute left-1/2 transform -translate-x-1/2">
        <li>
          <Link
            to="/technical-clubs"
            className={`pb-2 ${
              page === "technical"
                ? "border-b-4 border-white"
                : "hover:border-b-4 hover:border-gray-300"
            } transition-all`}
          >
            Technical
          </Link>
        </li>
        <li>
          <Link
            to="/nontechnical-clubs"
            className={`pb-2 ${
              page === "nontechnical"
                ? "border-b-4 border-white"
                : "hover:border-b-4 hover:border-gray-300"
            } transition-all`}
          >
            Non-Technical
          </Link>
        </li>
      </ul>

      {/* Right: Profile + Auth */}
      <div className="flex items-center space-x-4">
        {user ? (
          // --- User is Logged In ---
          <>
            <img
              src="/pfp.jpg" // Use image from /public folder
              alt="User Profile"
              className="h-10 w-10 rounded-full border-4 border-white shadow-md object-cover"
            />
            <span className="text-white font-semibold">{user.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-semibold rounded-md shadow transition"
            >
              Logout
            </button>
          </>
        ) : (
          // --- User is Logged Out ---
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-white text-sm font-semibold rounded-md transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md shadow transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}