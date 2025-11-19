import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

export default function Navbar() {
  const { user, logout } = useAuth(); 

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-600 via-red-800 to-black shadow-lg px-8 py-6 flex items-center justify-between z-50">
      <Link to="/">
        <img src="/logo.png" alt="ClubNexus Logo" className="h-16 w-auto" />
      </Link>
      
      <ul className="flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
        <li>
          <Link to="/" className="text-white font-serif hover:text-yellow-300 text-lg font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/technical-clubs" className="text-white font-serif hover:text-yellow-300 text-lg font-medium">
            Technical Clubs
          </Link>
        </li>
        <li>
          <Link to="/nontechnical-clubs" className="text-white font-serif hover:text-yellow-300 text-lg font-medium">
            Non Technical Clubs
          </Link>
        </li>
        <li>
          <a href="#about" className="text-white font-serif hover:text-yellow-300 text-lg font-medium">
            About
          </a>
        </li>
        <li>
          <a href="#faq" className="text-white font-serif hover:text-yellow-300 text-lg font-medium">
            FAQs
          </a>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="relative w-14 h-14">
              <div className="absolute h-10 w-10 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <img src="/pfp.jpg" alt="Profile" className="w-10 h-10 object-cover rounded-full" />
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg shadow hover:bg-gray-300 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg shadow hover:bg-gray-300 transition">
              Login
            </Link>
            <Link 
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-800 text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}