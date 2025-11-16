import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedClubCard({ name, img, link }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="flex-shrink-0 w-64 h-80 rounded-2xl shadow-lg bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group"
    >
      <div className="w-full h-2/3 bg-gray-100 overflow-hidden">
        <img 
          src={`/${img}`} 
          alt={name} 
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110" 
          onError={(e) => { e.target.src = 'https://placehold.co/200x200/ef4444/white?text=Logo'; }}
        />
      </div>
      <div className="w-full h-1/3 p-4 flex flex-col justify-center items-center text-center bg-white">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      </div>
    </div>
  );
}