import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import EventCard from '../components/EventCard';

const slideshowImages = [
  '/firstieee.webp',
  '/secondieee.webp',
  '/thirdieee.webp',
  '/fourthieee.webp',
];

export default function IEEE() {
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
        const ieeeClub = clubs.find((c) => c.name === 'IEEE');

        if (ieeeClub) {
          // 2. Get Events
          const eventRes = await fetch(`/api/events/${ieeeClub._id}`);
          if (eventRes.ok) {
            const eventData = await eventRes.json();
            setEvents(Array.isArray(eventData) ? eventData : []);
          } else {
            console.warn('Failed to fetch events:', eventRes.status);
            setEvents([]);
          }

          // 3. Get Openings
          const openingRes = await fetch(`/api/openings/${ieeeClub._id}`);
          if (openingRes.ok) {
            const openingData = await openingRes.json();
            setOpening(openingData || null);
          } else {
            setOpening(null);
          }
        } else {
          // no IEEE club found
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
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/firstieee.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar />
      <div className="h-28" />

      <main className="container mx-auto px-4 py-10">
        {/* --- GLASS EFFECT CONTAINER --- */}
        <div className="bg-black bg-opacity-60 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-20 max-w-4xl mx-auto">

          {/* --- 1. HEADER (Name & Tagline) --- */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="/ieee.webp"
              alt="IEEE Club Logo"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
            />
            <div className="text-center md:text-left mt-4">
              <h1 className="text-6xl font-extrabold text-blue-600 mb-3">IEEE</h1>
              <p className="text-2xl text-gray-200 mb-4">Advancing Technology for Humanity</p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/ieeeciet?igsh=MWxqMmJtcDU4em9zcw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                  aria-label="IEEE Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ieee-ciet-student-branch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-blue-500 transition-colors"
                  aria-label="IEEE LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>

          {/* --- RECRUITMENT BANNER --- */}
          {opening && (opening.technicalRoles?.length > 0 || opening.nonTechnicalRoles?.length > 0) && (
            <div className="mt-12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <div className="relative bg-black bg-opacity-80 p-8 rounded-xl border border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white mb-4 animate-pulse">
                      WE ARE HIRING!
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                      Join the team and make an impact. We are looking for passionate individuals for the following roles:
                    </p>

                    <div className="space-y-4">
                      {opening.technicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-blue-400 font-bold mb-2 uppercase tracking-wider text-sm">Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.technicalRoles.map((role) => (
                              <span key={role} className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-blue-200 text-sm">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {opening.nonTechnicalRoles?.length > 0 && (
                        <div>
                          <h3 className="text-cyan-400 font-bold mb-2 uppercase tracking-wider text-sm">Non-Technical</h3>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {opening.nonTechnicalRoles.map((role) => (
                              <span key={role} className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-cyan-200 text-sm">
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
                      className="inline-block px-8 py-3 bg-blue-900/30 border border-blue-500/30 text-blue-200 font-bold rounded-full shadow-lg hover:bg-blue-900/50 hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300"
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
            <h2 className="text-3xl font-bold mb-4 text-blue-500">About Us</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              IEEE CIET is the student branch of the Institute of Electrical and Electronics Engineers (IEEE) at Coimbatore Institute of Engineering and Technology. It's a platform for students to explore cutting-edge technologies, network with industry professionals, and enhance their technical skills.
            </p>
          </div>

          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-500">What are the benefits of joining IEEE CIET?</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Benefits include access to IEEE's vast digital library, networking opportunities with industry professionals, participation in workshops and conferences, eligibility for IEEE scholarships, and the chance to work on cutting-edge projects and research.
            </p>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
