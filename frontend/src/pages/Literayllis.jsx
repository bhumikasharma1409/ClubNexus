import React from 'react';
import Navbar from '../components/NavbarNonTechnical';

export default function Literayllis() {
  const pageStyle = {
    backgroundImage: "url('/lit2.jpg')", // From Litreyllis.html
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
              src="/literayllis.jpeg" // From seed.js
              alt="Literayllis Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-blue-400 mb-2">
                Literayllis
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                The Literary Society of Chitkara University
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/c2s2_literayllis?igsh=N3ZlcTNhOGF3d3Yz" 
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
            <h2 className="text-3xl font-bold mb-4 text-blue-300">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The official literary society that celebrates poetry, debate, and storytelling. We host open mics, writing competitions, and discussions to foster a love for literature.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src="/lit1.jpeg" alt="Literayllis event 1" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/lit4.jpeg" alt="Literayllis event 2" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/poetry.jpeg" alt="Literayllis event 3" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}