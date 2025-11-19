import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar'; 
import Slideshow from '../components/Slideshow'; 
import EventCard from '../components/EventCard'; 



const slideshowImages = [
  '/eight.jpg',
  '/second.jpg',
  '/first.jpg',
  '/third.jpg',
];

const upcomingEvents = [
  {
    title: 'ByteBattles: Coding Duel',
    date: 'Dec 03, 2025',
    time: '5:00 PM - 7:00 PM',
    description: 'A fast-paced 1v1 competitive programming tournament. Quick thinking and clean code will win the day. Sign up with a partner!'
  },
  {
    title: 'GameDev 101: Intro to Unity',
    date: 'Dec 09, 2025',
    time: '2:00 PM - 4:00 PM',
    description: 'Ever wanted to build your own game? Join our workshop to learn the fundamentals of game development using the Unity engine.'
  },
  {
    title: 'LAN Gaming Night (Valorant)',
    date: 'Dec 12, 2025',
    time: '6:00 PM onwards',
    description: 'Join us for an all-night Valorant tournament in the main lab. Form your teams of 5. Pizza and energy drinks provided!'
  }
];


export default function BitsNBytes() {
  const pageStyle = {
    backgroundImage: "url('/eight.jpg')", 
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
              src="/bits.webp" // From seed.js
              alt="Bit N Bytes Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
            />
            <div className="text-center md:text-left mt-4">
              <h1 className="text-6xl font-extrabold text-yellow-500 mb-3">
                Bit N Bytes
              </h1>
              <p className="text-2xl text-gray-200 mb-4">
                Coding, Gaming, and Digital Competitions
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/bits_n_bytes?igsh=aWtwNWZscW5kZmsy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/company/bits-n-bytes-chitkara/" 
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
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Explore coding, gaming, and fun digital competitions. We host hackathons, gaming tournaments, and tech quizzes to challenge and engage the tech community on campus.
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