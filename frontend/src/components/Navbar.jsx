// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const auth = useAuth();
const user = auth?.user;
const logout = auth?.logout;

  const navigate = useNavigate();
  const location = useLocation();

  // height of navbar to offset scroll (adjust if needed)
  const NAV_OFFSET = 84;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();

    // If already on home page, scroll immediately
    if (location.pathname === '/') {
      scrollToSection(id);
      return;
    }

    // Otherwise navigate to home then scroll after a short delay so the DOM renders
    navigate('/');
    // Delay to allow home content to mount — 100ms is usually enough
    setTimeout(() => {
      scrollToSection(id);
    }, 120);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-600 via-red-800 to-black shadow-lg px-8 py-6 flex items-center justify-between z-50">
      <Link to="/" onClick={() => {
        // when clicking logo, ensure we navigate home and scroll to top
        if (location.pathname !== '/') navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}>
        <img src="/logo.png" alt="ClubNexus Logo" className="h-16 w-auto" />
      </Link>

      <ul className="flex space-x-10 absolute left-1/2 transform -translate-x-1/2">
        <li>
          {/* Home -> hero section with id="home" */}
          <a
            href="#home"
            onClick={handleNavClick('home')}
            className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
          >
            Home
          </a>
        </li>

        <li>
          {/* Clubs -> section id="clubs" */}
          <a
            href="#clubs"
            onClick={handleNavClick('clubs')}
            className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
          >
            Clubs
          </a>
        </li>

        <li>
          {/* About -> section id="about" */}
          <a
            href="#about"
            onClick={handleNavClick('about')}
            className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
          >
            About
          </a>
        </li>

        <li>
          {/* FAQs -> section id="faq" */}
          <a
            href="#faq"
            onClick={handleNavClick('faq')}
            className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
          >
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
              className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg shadow hover:bg-gray-300 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-800 text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
