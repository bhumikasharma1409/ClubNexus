import React from 'react';
import Navbar from '../components/NavbarTechnical';

export default function GDSC() {
  const pageStyle = {
    backgroundImage: "url('/eight.jpg')", // Default tech background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar />
      <div className="h-28"></div>
      <main className="container mx-auto px-4 py-10">
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-xl backdrop-blur-md max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img 
              src="/google.jpg" // From seed.js
              alt="GDSC Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-blue-500 mb-2">
                GDSC
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                Google Developer Student Clubs
              </p>
              {/* Social links are '#' in seed.js, so they are hidden */}
            </div>
          </div>

          <div className="mt-10 border-t border-gray-600 pt-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Learn and build using Google technologies with peers. We host workshops on Android, Flutter, Firebase, GCP, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}