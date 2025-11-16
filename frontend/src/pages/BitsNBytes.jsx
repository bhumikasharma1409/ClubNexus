import React from 'react';
import Navbar from '../components/NavbarTechnical';

export default function BitsNBytes() {
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
              src="/bits.webp" // From seed.js
              alt="Bit N Bytes Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-yellow-500 mb-2">
                Bit N Bytes
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                Coding and Gaming
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/bits_nbytes?igsh=aWtwNWZscW5kZmsy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/company/bits-n-bytes-chitkara/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-600 pt-6">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Explore coding, gaming, and fun digital competitions. We host hackathons, gaming tournaments, and tech quizzes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}