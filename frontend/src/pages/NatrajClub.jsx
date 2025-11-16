import React from 'react';
import Navbar from '../components/NavbarNonTechnical';

export default function Natraj() {
  const pageStyle = {
    backgroundImage: "url('/book.jpg')", // Default background
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
              src="/natraj.jpeg" // From seed.js
              alt="Natraj Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-red-700 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-red-700 mb-2">
                Natraj
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                The Classical Dance Club
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/c2s2_natraj?igsh=MWl6em1mczYwdnM4aQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-600 pt-6">
            <h2 className="text-3xl font-bold mb-4 text-red-600">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The classical dance club dedicated to Bharatanatyam, Kathak, and Odissi traditions. We preserve and promote the rich heritage of Indian classical dance.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}