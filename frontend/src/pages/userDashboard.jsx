import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user, token, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/user/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h2>
          <Link to="/login" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now);

  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-gray-50 font-serif">
      <Navbar />

      <div className="pt-24 pb-12 container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffe5e5] to-[#ffcaca] border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-red-900 uppercase">
                {user.name ? user.name.charAt(0) : user.email.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="px-4 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                    {user.course || 'Student'}
                  </div>
                  {user.year && (
                    <div className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                      Year {user.year}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 text-lg font-medium transition-colors relative ${activeTab === 'upcoming'
              ? 'text-red-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Upcoming Events
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 text-lg font-medium transition-colors relative ${activeTab === 'past'
              ? 'text-red-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Past Events
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-t-full" />
            )}
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map(event => (
              <EventCard
                key={event._id}
                title={event.title}
                date={new Date(event.date).toLocaleDateString()}
                time={event.time}
                description={event.description}
                poster={event.poster}
                clubName={event.club?.name}
                isRegistered={true} // Since these are fetched from user's registered events
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-gray-400 mb-4 text-6xl">📅</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">You haven't registered for any {activeTab} events yet.</p>
            <Link to="/#clubs" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition">
              Explore Clubs
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
