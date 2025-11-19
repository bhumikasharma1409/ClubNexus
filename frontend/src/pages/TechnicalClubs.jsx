import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Navbar from "../components/Navbar"; 
import ClubCard from "../components/ClubCard";
import ParticlesBg from "../components/ParticlesBg";

export default function TechnicalClubs() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/technical-clubs");
        if (!res.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await res.json();
        setClubs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchClubs();
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <ParticlesBg />
      <Navbar />

      {/* Re-using the gradient style from Home.jsx */}
      <style>{`
        .gradient-text-red {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
      `}</style>

      {/* Spacer for fixed navbar */}
      <div className="h-32"></div>

      {/* --- New Header Section --- */}
      <section className="relative pt-16 pb-24 text-center">
        <div className="container mx-auto px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text-red">Technical Clubs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Innovate, build, and code with the brightest minds on campus. Explore all the technical communities you can join.
          </p>
        </div>
      </section>

      {/* --- Clubs Grid Section --- */}
      <section className="relative z-10 pb-24">
        <div className="container mx-auto px-6">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <ClubCard
                  key={club.id}
                  id={club.id}
                  img={club.img}
                  name={club.name}
                  desc={club.desc}
                  insta={club.insta}
                  linkedin={club.linkedin}
                  link={club.link}
                />
              ))
            ) : (
              !error && <p className="text-center col-span-4">Loading clubs...</p>
            )}
          </div>
        </div>
      </section>

      {/* --- Footer (Copied from Home.jsx) --- */}
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