import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavbarTechnical'; // We re-use your React navbar
import logo from '/logo.png'; // We re-use the logo from assets

// This is your old index.html, converted to a React component.
export default function Home() {
  // We apply the background image using a style object
  const pageStyle = {
    backgroundImage: "url('/chitkara.jpg')", // Gets the image from frontend/public/
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      {/* 1. We use your existing React Navbar component */}
      <Navbar />

      {/* Spacer for the fixed navbar */}
      <div className="h-28"></div>

      {/* 2. This is the main content from your index.html */}
      <main className="container mx-auto px-4 py-16 text-center">
        {/* Logo and Welcome Message */}
        <img 
          src={logo} 
          alt="ClubNexus Logo" 
          className="mx-auto h-40 w-auto mb-6"
        />
        <h1 className="text-5xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Welcome to ClubNexus
        </h1>
        <p className="text-2xl mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
          Your Central Hub for all Chitkara University Clubs
        </p>

        {/* 3. Links are updated to use React Router <Link> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Technical Clubs Card */}
          <Link 
            to="/technical-clubs" 
            className="bg-black bg-opacity-70 p-8 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-red-500 mb-4">
              Technical Clubs
            </h2>
            <p className="text-lg">
              Explore clubs focused on coding, development, AI, and cutting-edge technology.
            </p>
          </Link>

          {/* Non-Technical Clubs Card */}
          <Link 
            to="/nontechnical-clubs" 
            className="bg-black bg-opacity-70 p-8 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-opacity-80 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">
              Non-Technical Clubs
            </h2>
            <p className="text-lg">
              Discover clubs for arts, culture, dance, music, literature, and public speaking.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}