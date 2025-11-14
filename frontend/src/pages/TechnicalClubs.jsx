import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarTechnical";
import ClubCard from "../components/ClubCard";

export default function TechnicalClubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // This block is now complete
    fetch("/api/technical-clubs")
      .then((res) => res.json())
      .then((data) => setClubs(data))
      .catch((err) => console.error("Error fetching technical clubs:", err));
  }, []);

  return (
    <>
      <Navbar page="technical"/>

      {/* Content stays ABOVE particles */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="h-28"></div>

        <div className="text-center my-6">
          <h2 className="text-4xl font-bold text-red-600 tracking-wide uppercase drop-shadow-lg">
            Technical Clubs
          </h2>
          <p className="text-gray-700 mt-2 text-xl">
            Dive into coding, innovation, and tech-driven activities
          </p>
        </div>

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