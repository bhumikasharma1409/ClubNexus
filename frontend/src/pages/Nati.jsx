import React from 'react';
import Navbar from '../components/NavbarNonTechnical';

export default function Nati() {
  const pageStyle = {
    backgroundImage: "url('/creative.png')", // From Nati.html
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
              src="/nati.jpg" // From seed.js
              alt="Nati Club" 
              className="w-48 h-48 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-extrabold text-yellow-500 mb-2">
                Nati
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                The Dramatics Club of Chitkara University
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a 
                  href="https://www.instagram.com/c2s2_nati_?igsh=MXNneGVsOGtyY2VyeQ==" 
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
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Nati, the dramatics club, showcases stage plays, skits, and street theatre performances. We bring stories to life and provide a platform for actors, writers, and directors.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <img src="/fifth.jpg" alt="Nati event 1" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/sixth.jpg" alt="Nati event 2" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
              <img src="/seven.jpg" alt="Nati event 3" className="rounded-lg object-cover w-full h-48 shadow-lg"/>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}