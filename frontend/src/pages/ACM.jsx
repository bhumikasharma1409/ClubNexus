import React from 'react';
import { Link } from 'react-router-dom'; // ADDED: For footer links
import Navbar from '../components/Navbar'; // CHANGED: Use main navbar
import Slideshow from '../components/Slideshow'; // ADDED: New component
import EventCard from '../components/EventCard'; // ADDED: New component

// --- MOCK DATA ---
// (In a real app, you might fetch this from your backend)

const slideshowImages = [
  '/first.jpg',
  '/second.jpg',
  '/third.jpg',
  '/eight.jpg',
];

const upcomingEvents = [
  {
    title: 'ACM Tech Talk: AI & Ethics',
    date: 'Dec 01, 2025',
    time: '3:00 PM - 4:00 PM',
    description: 'Join us for a deep dive into the ethical implications of modern AI, featuring a guest speaker from the industry.'
  },
  {
    title: 'Hour of Code: Python Basics',
    date: 'Dec 08, 2025',
    time: '1:00 PM - 3:00 PM',
    description: 'A beginner-friendly workshop designed to get new students into the world of programming with Python. No prior experience needed!'
  },
  {
    title: 'Research Paper Reading Session',
    date: 'Dec 15, 2025',
    time: '4:00 PM - 5:00 PM',
    description: 'Our monthly session where we break down a significant computing paper. This month: "Attention Is All You Need".'
  }
];
// --- END MOCK DATA ---

export default function ACM() {
  const pageStyle = {
    backgroundImage: "url('/eight.jpg')", // Default tech background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar /> {/* CHANGED: Using main navbar */}
      <div className="h-28"></div>

      <main className="container mx-auto px-4 py-10">
        {/* --- GLASS EFFECT CONTAINER --- */}
        <div className="bg-black bg-opacity-40 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-20 max-w-4xl mx-auto">
          
          {/* --- 1. HEADER (Name & Tagline) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img 
              src="/acm.jpg" // From seed.js
              alt="ACM Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 shadow-lg"
            />
            <div className="text-center md:text-left mt-4">
              <h1 className="text-6xl font-extrabold text-blue-400 mb-3">
                ACM
              </h1>
              <p className="text-2xl text-gray-200 mb-4">
                Association for Computing Machinery
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/acm_cuiet?igsh=MW50Zzc1ZWd0bHJxYQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/company/chitkara-acm-student-chapter/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-3xl text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* --- 2. SLIDESHOW --- */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Recent Moments</h2>
            <Slideshow images={slideshowImages} />
          </div>

          {/* --- 3. UPCOMING EVENTS --- */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.title}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.description}
                />
              ))}
            </div>
          </div>

          {/* --- 4. ABOUT US --- */}
          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Advance computing with workshops, papers, and events. We are dedicated to fostering innovation and excellence in computer science and promoting research.
            </p>
          </div>
        </div>
      </main>

      {/* --- 5. FOOTER (from Home.jsx) --- */}
      <footer className="relative z-10 bg-gradient-to-r from-red-600 via-red-800 to-black text-white pt-16 pb-12 mt-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="ClubNexus Logo" className="h-16 w-auto mb-4" />
            <p className="text-gray-300">
              Your one-stop platform for discovering and connecting with all the clubs at Chitkara University.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
              <li><a href="/#about" className="hover:text-yellow-300">About Us</a></li>
              <li><a href="/#faq" className="hover:text-yellow-300">FAQs</a></li>
              <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Discover</h5>
            <ul className="space-y-2">
              <li><Link to="/technical-clubs" className="hover:text-yellow-300">Technical Clubs</Link></li>
              <li><Link to="/nontechnical-clubs" className="hover:text-yellow-300">Non-Technical Clubs</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-12 pt-8 border-t border-red-700">
          © 2024 ClubNexus. Developed by Students.
        </div>
      </footer>
    </div>
  );
}