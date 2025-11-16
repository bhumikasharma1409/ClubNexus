import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavbarNonTechnical'; // Use the correct navbar

export default function Dhwani() {
  
  // 1. We apply the background image from your old file
  const pageStyle = {
    backgroundImage: "url('/book.jpg')", // Gets 'book.jpg' from frontend/public/
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar /> {/* 2. Use the shared React Navbar */}

      {/* Spacer for the fixed navbar */}
      <div className="h-28"></div>

      {/* 3. Main content, styled with Tailwind for a modern look */}
      <main className="container mx-auto px-4 py-10">
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-xl backdrop-blur-md max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img 
              src="/dhwani.jpeg" // Gets image from frontend/public/
              alt="Dhwani Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-red-500 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-red-500 mb-2">
                Dhwani
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                The Music Club of Chitkara University
              </p>
              {/* Social Media Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/c2s2__dhwani?igsh=MXFhNmoxaXV6N2k1YQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                {/* Add other links here if they exist */}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-10 border-t border-gray-600 pt-6">
            <h2 className="text-3xl font-bold mb-4 text-red-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Dhwani, the music club, unites singers and instrumentalists to create soulful melodies. We are a community of music lovers dedicated to exploring different genres, performing at events, and sharing our passion for music.
            </p>
          </div>

          {/* Gallery or Events Section (Example) */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4 text-red-400">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src="/first.jpg" alt="Dhwani event 1" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/second.jpg" alt="Dhwani event 2" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/third.jpg" alt="Dhwani event 3" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}