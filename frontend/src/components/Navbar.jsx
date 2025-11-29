// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  const navigate = useNavigate();
  const location = useLocation();

  // Medium size navbar offset
  const NAV_OFFSET = 75;

  const [mobileOpen, setMobileOpen] = useState(false);

  // close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    // close mobile panel if open
    setMobileOpen(false);

    if (location.pathname === '/') {
      scrollToSection(id);
      return;
    }
    navigate('/');
    // allow time for the home page to mount
    setTimeout(() => scrollToSection(id), 120);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-600 via-red-800 to-black shadow-lg px-4 md:px-8 py-3 md:py-4 flex items-center justify-between z-50">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname !== '/') navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileOpen(false);
            }}
            className="flex items-center"
          >
            <img src="/logo.png" alt="ClubNexus Logo" className="h-10 md:h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu (hidden on small screens) */}
        <ul className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <li>
            <a
              href="#home"
              onClick={handleNavClick('home')}
              className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#clubs"
              onClick={handleNavClick('clubs')}
              className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
            >
              Clubs
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={handleNavClick('about')}
              className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#faq"
              onClick={handleNavClick('faq')}
              className="text-white font-serif hover:text-yellow-300 text-lg font-medium"
            >
              FAQs
            </a>
          </li>
        </ul>

        {/* Right area: auth buttons + mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="relative w-12 h-12">
                  <div className="absolute h-11 w-11 bg-white rounded-full border-2 border-white shadow flex items-center justify-center overflow-hidden">
                    <img
                      src="/pfp.jpg"
                      alt="Profile"
                      className="w-11 h-11 object-cover rounded-full"
                    />
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            title="Menu"
          >
            {/* simple animated hamburger */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel (slide down) */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-[64px] left-0 right-0 bg-black/60 backdrop-blur-sm z-40 transform transition-all duration-200 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto bg-white rounded-b-xl shadow-xl mt-0 overflow-hidden">
          <div className="p-4">
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                onClick={handleNavClick('home')}
                className="block text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="#clubs"
                onClick={handleNavClick('clubs')}
                className="block text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-50"
              >
                Clubs
              </a>
              <a
                href="#about"
                onClick={handleNavClick('about')}
                className="block text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-50"
              >
                About
              </a>
              <a
                href="#faq"
                onClick={handleNavClick('faq')}
                className="block text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-50"
              >
                FAQs
              </a>
            </nav>

            <div className="border-t border-gray-100 my-3" />

            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                      <img src="/pfp.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name || user.email}</div>
                      <div className="text-xs text-gray-500">Member</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-800 text-white font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
