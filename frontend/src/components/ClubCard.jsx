import React, { useState, useEffect } from "react";

export default function ClubCard({ img, name, desc, insta, linkedin, link }) {
  const [imageError, setImageError] = useState(false);
  
  // Public folder files are served at root path in Vite
  // So /img files map directly to localhost:5174/img
  const imagePath = img ? `/${img}` : null;

  useEffect(() => {
    console.log(`[ClubCard] ${name}: img="${img}", imagePath="${imagePath}", imageError=${imageError}`);
  }, [img, imagePath, imageError, name]);

  const handleImageError = (e) => {
    console.error(`[ClubCard] Failed to load image: ${imagePath}`, e);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`[ClubCard] Successfully loaded image: ${imagePath}`);
  };

  const handleCardClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="block group bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
        {imagePath && !imageError ? (
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-sm text-center px-2">{name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
          {desc}
        </p>
        <div className="flex justify-start space-x-3">
          {insta && insta !== "#" && (
            <a
              href={insta}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          )}
          {linkedin && linkedin !== "#" && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-500 hover:text-blue-700 transition-colors"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}