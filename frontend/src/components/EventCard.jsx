import React from 'react';

export default function EventCard({ title, date, time, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
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
        <button className="mt-auto w-full text-white font-bold py-2 px-4 rounded-lg text-sm bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all">
          Register Now
        </button>
      </div>
    </div>
  );
}