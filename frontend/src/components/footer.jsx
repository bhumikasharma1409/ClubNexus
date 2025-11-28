// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-red-600 via-red-800 to-black text-white pt-4 pb-3">

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* LEFT — LOGO + TEXT (NOW BIGGER) */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img src="/logo.png" alt="ClubNexus Logo" className="h-14 w-auto mb-2" />
          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
            Your hub for innovation and community at Chitkara University.
          </p>
        </div>

        {/* EMPTY CENTER */}
        <div></div>

        {/* RIGHT — QUICK LINKS CENTERED */}
        <div className="flex flex-col justify-center items-center text-center">
          <h4 className="text-base font-semibold mb-2">Quick Links</h4>

          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:text-yellow-300">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300">Clubs</a></li>
            <li><a href="#" className="hover:text-yellow-300">About</a></li>
            <li><a href="#" className="hover:text-yellow-300">FAQs</a></li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-[10px] text-gray-400 mt-3 border-t border-white/10 pt-2">
        © 2025 ClubNexus. All rights reserved.
      </p>

    </footer>
  );
}
