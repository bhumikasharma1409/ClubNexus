import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarNonTechnical";
import ClubCard from "../components/ClubCard";

export default function NonTechnicalClubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // This block is now complete
    fetch("/api/nontechnical-clubs")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error("Error fetching non-technical clubs:", err));
  }, []);

  return (
    <>
      <Navbar page="nontechnical"/>

      {/* Page Wrapper */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="h-28"></div>

        {/* Header Section */}
        <div className="text-center my-6">
          <h2 className="text-4xl font-bold text-red-600 tracking-wide uppercase drop-shadow-lg">
            Non-Technical Clubs
          </h2>
          <p className="text-gray-700 mt-2 text-xl">
            Explore the creative and cultural sides of campus life
          </p>
        </div>

        {/* Managed By OSA banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 overflow-hidden shadow-lg relative z-10 py-3 mb-6">
          <p className="text-white text-lg md:text-xl font-bold tracking-widest uppercase text-center animate-pulse">
            ✨ Managed by OSA, Chitkara University ✨
          </p>
        </div>

        {/* Club Cards Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {clubs.map((club) => (
            <ClubCard
              key={club.id}
              img={club.img}
              name={club.name}
              desc={club.desc}
              insta={club.insta}
              linkedin={club.linkedin}
              link={club.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}