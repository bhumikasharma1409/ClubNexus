import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import EventCard from '../components/EventCard';

const slideshowImages = [
  '/open.jpg',
  '/first.jpg',
  '/second.jpg',
  '/eight.jpg',
];

export default function OpenSource() {
  const [events, setEvents] = useState([]);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get Club ID
        const clubRes = await fetch('/api/clubs');
        const clubs = await clubRes.json();
        const openSourceClub = clubs.find(c => c.name === 'Open Source');

        if (openSourceClub) {
          // 2. Get Events
          const eventRes = await fetch(`/api/events/${openSourceClub._id}`);
          const eventData = await eventRes.json();
          setEvents(eventData);

          // 3. Get Openings
          const openingRes = await fetch(`/api/openings/${openSourceClub._id}`);
          if (openingRes.ok) {
            const openingData = await openingRes.json();
            setOpening(openingData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  const pageStyle = {
    backgroundImage: "url('/eight.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar />
      <div className="h-28"></div>

      <main className="container mx-auto px-4 py-10">
        {/* --- GLASS EFFECT CONTAINER --- */}
        <div className="bg-black bg-opacity-40 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-20 max-w-4xl mx-auto">

          {/* --- 1. HEADER (Name & Tagline) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="/open.jpg"
              alt="Open Source Chandigarh"
              className="w-48 h-48 rounded-full object-cover border-4 border-red-500 shadow-lg"
            />
            <div className="text-center md:text-left mt-4">
              <h1 className="text-6xl font-extrabold text-red-500 mb-3">
                Open Source
              </h1>
              <p className="text-2xl text-gray-200 mb-4">
                Collaborate and Contribute
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/opensourcechandigarh?igsh=NHZldWJkbmVleTBs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/open-source-chandigarh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* --- RECRUITMENT BANNER --- */}
          {opening && (opening.technicalRoles?.length > 0 || opening.nonTechnicalRoles?.length > 0) && (
            <div className="mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative bg-black bg-opacity-80 p-8 rounded-xl border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white mb-4 animate-pulse">
                      WE ARE HIRING!
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                      Join the team and make an impact. We are looking for passionate individuals for the following roles:
                    </p>

                    <div className="space-y-4">
                      {opening.technicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-red-400 font-bold mb-2 uppercase tracking-wider text-sm">Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.technicalRoles.map(role => (
                              <span key={role} className="px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-red-200 text-sm">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {opening.nonTechnicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-blue-400 font-bold mb-2 uppercase tracking-wider text-sm">Non-Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.nonTechnicalRoles.map(role => (
                              <span key={role} className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-200 text-sm">
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
                      className="inline-block px-8 py-3 bg-red-900/30 border border-red-500/30 text-red-200 font-bold rounded-full shadow-lg hover:bg-red-900/50 hover:shadow-red-500/20 transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- 2. SLIDESHOW --- */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Recent Moments</h2>
            <Slideshow images={slideshowImages} />
          </div>

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
                    date={new Date(event.date).toLocaleDateString()}
                    time={event.time}
                    description={event.description}
                    poster={event.poster}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- 4. ABOUT US --- */}
          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-red-400">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Contribute to real-world projects and collaborate globally. We aim to build a strong open-source culture on campus.
            </p>
          </div>
        </div>
      </main>

      {/* --- 5. FOOTER (from Home.jsx) --- */}
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