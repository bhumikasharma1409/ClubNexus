import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import pfp from "../assets/pfp.jpg";

export default function NavbarTechnical() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-700 via-red-800 to-black shadow-lg px-10 py-6 flex items-center justify-between z-30">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="ClubNexus Logo" className="h-14 w-auto" />
      </Link>

      {/* Center: Menu */}
      <ul className="flex space-x-14 text-lg font-semibold font-serif text-white absolute left-1/2 transform -translate-x-1/2">
        <li>
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
        </li>
        <li>
          {/* 👇 Shows Non-Technical Clubs link here */}
          <Link
            to="/nontechnical-clubs"
            className="hover:text-yellow-300 transition"
          >
            Non-Technical Clubs
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-yellow-300 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/faq" className="hover:text-yellow-300 transition">
            FAQs
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Right: Profile + Sign Up */}
      <div className="flex items-center space-x-4">
        <img
          src={pfp}
          alt="User Profile"
          className="h-10 w-10 rounded-full border-4 border-white shadow-md object-cover"
        />
        <Link
          to="/register"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md shadow transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
