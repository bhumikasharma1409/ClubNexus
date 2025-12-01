import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EventRegistrationModal from './EventRegistrationModal';

export default function EventCard({ id, title, date, time, description, poster, clubName, isRegistered }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(isRegistered || false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (registered) return;
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/events/${id}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setRegistered(true);
        setIsModalOpen(false);
        alert('Successfully registered!');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegistrationSubmit}
        eventTitle={title}
        user={user}
      />
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
        {clubName && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm z-10">
            {clubName}
          </div>
        )}
        {poster && (
          <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={poster}
              alt={title}
              className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center text-sm text-red-600 font-semibold mb-3 space-x-4">
            <span>
              <i className="fas fa-calendar-alt mr-2"></i>
              {date}
            </span>
            <span>
              <i className="fas fa-clock mr-2"></i>
              {time}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
            {description}
          </p>

          {registered ? (
            <button
              disabled
              className="mt-auto w-full text-white font-bold py-2 px-4 rounded-lg text-sm bg-green-600 cursor-default opacity-90"
            >
              <i className="fas fa-check mr-2"></i> Registered
            </button>
          ) : (
            <button
              onClick={handleRegisterClick}
              disabled={loading}
              className={`mt-auto w-full text-white font-bold py-2 px-4 rounded-lg text-sm bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}