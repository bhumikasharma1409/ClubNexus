import React, { useState, useEffect } from 'react';

export default function Slideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg relative">
      {images.map((imgSrc, index) => (
        <img
          key={imgSrc}
          src={imgSrc}
          alt={`Slide ${index + 1}`}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}