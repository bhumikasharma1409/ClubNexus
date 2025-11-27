// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-red-600 via-red-800 to-black text-white pt-10 pb-6">
      {/* SMALL WAVE TOP BORDER */}
      <div className="absolute top-0 left-0 w-full pointer-events-none -translate-y-full">
        <svg viewBox="0 0 1440 120" className="w-full h-16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="60%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <path d="M0,60 Q360,0 720,60 T1440,60 L1440,120 L0,120 Z" fill="url(#waveGrad)" />
        </svg>
      </div>

      {/* CONTENT (compact) */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src="/logo.png" alt="ClubNexus Logo" className="h-10 w-auto mb-2" />
          <p className="text-xs text-gray-300 leading-relaxed">
            Your hub for innovation and community at Chitkara University.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-xs text-gray-300">
            <li><a href="#" className="hover:text-yellow-300">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300">Clubs</a></li>
            <li><a href="#" className="hover:text-yellow-300">About</a></li>
            <li><a href="#" className="hover:text-yellow-300">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Connect</h4>
          <div className="flex space-x-3">
            <a className="text-gray-300 hover:text-yellow-300 text-xl" href="#" aria-label="Instagram">IG</a>
            <a className="text-gray-300 hover:text-yellow-300 text-xl" href="#" aria-label="LinkedIn">IN</a>
            <a className="text-gray-300 hover:text-yellow-300 text-xl" href="#" aria-label="GitHub">GH</a>
          </div>
        </div>

        
        
      </div>

      <p className="text-center text-[10px] text-gray-400 mt-6 border-t border-white/10 pt-3">
        © 2025 ClubNexus. All rights reserved.
      </p>
    </footer>
  );
}
