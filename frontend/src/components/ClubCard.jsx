import React from "react";

export default function ClubCard({ img, name, desc, insta, linkedin, link }) {
  // Convert image filename (e.g., "cn.jpg") into a usable URL path
  const imageUrl = new URL(`../assets/${img}`, import.meta.url).href;

  return (
    <div className="bg-black text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer min-h-[340px] flex flex-col justify-between">
      {/* Club Image */}
      <div className="p-2">
        <img
          src={imageUrl}
          className="w-full h-40 object-contain rounded-lg bg-white p-2"
          alt={name}
        />
      </div>

      {/* Club Info */}
      <div className="p-4 flex-1">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-300 mt-2">{desc}</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-6 mt-2 mb-3 text-xl">
        {insta && insta !== "#" && (
          <a
            href={insta}
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <i className="fab fa-instagram text-pink-500"></i>
          </a>
        )}
        {linkedin && linkedin !== "#" && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <i className="fab fa-linkedin text-sky-400"></i>
          </a>
        )}
      </div>

      {/* Learn More Button */}
      <div className="px-4 pb-4">
        <a
          href={link}
          className="block w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-2 rounded-lg text-center hover:opacity-90 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
