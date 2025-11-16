import React from 'react';
import { useNavigate } from 'react-router-dom';

// Updated to display the image and match the new red theme
export default function ClubCard({ id, img, name, desc, insta, linkedin, link }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    }
  };

  const imagePath = img ? `/${img}` : `https://placehold.co/300x200/ef4444/white?text=${name}`;

  return (
    <div 
      onClick={handleCardClick}
      className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer group"
    >
      {/* Image Container */}
      <div className="w-full h-48 bg-white p-4 overflow-hidden">
        <img 
          src={imagePath} 
          alt={name} 
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.src = `https://placehold.co/300x200/ef4444/white?text=${name}`; }}
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
          {desc}
        </p>

        {/* Social Links */}
        <div className="flex justify-start space-x-4 mb-5">
          {insta && insta !== "#" && (
            <a
              href={insta}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevents card click
              className="text-gray-400 hover:text-pink-600 transition-colors"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          )}
          {linkedin && linkedin !== "#" && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevents card click
              className="text-gray-400 hover:text-blue-700 transition-colors"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          )}
        </div>

        {/* Learn More Button - Aligned to bottom */}
        <div className="mt-auto">
          <button className="w-full text-white font-bold py-3 px-6 rounded-xl text-sm tracking-wide relative flex items-center justify-center gap-3 transition-all duration-300 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 hover:shadow-lg hover:-translate-y-0.5">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}