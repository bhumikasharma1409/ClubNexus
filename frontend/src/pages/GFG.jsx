import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import EventCard from '../components/EventCard';

const slideshowImages = [
  '/gfg.jpeg', // Assuming this exists or using a placeholder
  '/gfg.jpeg',
];

export default function GFG() {
  const [events, setEvents] = useState([]);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get Club ID
        const clubRes = await fetch('/api/clubs');
        const clubs = await clubRes.json();
        if (!Array.isArray(clubs)) {
          console.warn('/api/clubs did not return an array', clubs);
          return;
        }
        const gfgClub = clubs.find((c) => c.name === 'GFG' || c.name === 'GeeksforGeeks');

        if (gfgClub) {
          // 2. Get Events
          const eventRes = await fetch(`/api/events/${gfgClub._id}`);
          if (eventRes.ok) {
            const eventData = await eventRes.json();
            setEvents(Array.isArray(eventData) ? eventData : []);
          } else {
            console.warn('Failed to fetch events:', eventRes.status);
            setEvents([]);
          }

          // 3. Get Openings
          const openingRes = await fetch(`/api/openings/${gfgClub._id}`);
          if (openingRes.ok) {
            const openingData = await openingRes.json();
            setOpening(openingData || null);
          } else {
            setOpening(null);
          }
        } else {
          // no GFG club found
          setEvents([]);
          setOpening(null);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setEvents([]);
        setOpening(null);
      }
    };

    fetchData();
  }, []);

  const pageStyle = {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/gfg.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white font-serif">
      <Navbar />
      <div className="h-28" />

      <main className="container mx-auto px-4 py-10">
        {/* --- GLASS EFFECT CONTAINER --- */}
        <div className="bg-black bg-opacity-60 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-20 max-w-4xl mx-auto">

          {/* --- 1. HEADER (Name & Tagline) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="/gfg.jpeg"
              alt="GFG Club Logo"
              className="w-48 h-48 rounded-full object-cover border-4 border-green-600 shadow-lg"
            />
            <div className="text-center md:text-left mt-4">
              <h1 className="text-5xl md:text-6xl font-extrabold text-green-500 mb-3">GFG Student Chapter</h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-4">Master Data Structures & Algorithms</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/gfg_cuiet?igsh=bnptdWtsZTRlcWFq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                  aria-label="GFG Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-blue-500 transition-colors"
                  aria-label="GFG LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>

          {/* --- RECRUITMENT BANNER --- */}
          {opening && (opening.technicalRoles?.length > 0 || opening.nonTechnicalRoles?.length > 0) && (
            <div className="mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <div className="relative bg-black bg-opacity-80 p-8 rounded-xl border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-white mb-4 animate-pulse">
                      WE ARE HIRING!
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                      Join the team and make an impact. We are looking for passionate individuals for the following roles:
                    </p>

                    <div className="space-y-4">
                      {opening.technicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-green-400 font-bold mb-2 uppercase tracking-wider text-sm">Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.technicalRoles.map((role) => (
                              <span key={role} className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-200 text-sm">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {opening.nonTechnicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider text-sm">Non-Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.nonTechnicalRoles.map((role) => (
                              <span key={role} className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded-full text-emerald-200 text-sm">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 flex flex-col items-end gap-6">
                    {opening.poster && (
                      <img
                        src={opening.poster}
                        alt="Recruitment Poster"
                        className="w-full h-auto rounded-lg shadow-2xl border-2 border-white/10 transform hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <Link
                      to="/register"
                      className="inline-block px-8 py-3 bg-green-900/30 border border-green-500/30 text-green-200 font-bold rounded-full shadow-lg hover:bg-green-900/50 hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- 3. UPCOMING EVENTS --- */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Upcoming Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-300">No upcoming events at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    date={event.date ? new Date(event.date).toLocaleDateString() : ''}
                    time={event.time}
                    description={event.description}
                    poster={event.poster}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- 2. SLIDESHOW --- */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Recent Moments</h2>
            <Slideshow images={slideshowImages} />
          </div>

          {/* --- 4. ABOUT US --- */}
          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-green-500">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              GFG Student Chapter at Chitkara University is a community of coding enthusiasts who come together to learn, share, and grow. We focus on Data Structures, Algorithms, and competitive programming, helping students prepare for placements and improve their problem-solving skills.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-green-500">Why Join GFG?</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Join us to master DSA, participate in coding contests, get mentorship from seniors, and be part of a vibrant coding culture. We organize workshops, hackathons, and regular coding sessions to keep you sharp and industry-ready.
            </p>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
