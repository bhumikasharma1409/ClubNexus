import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarTechnical";
import ClubCard from "../components/ClubCard";

export default function TechnicalClubs() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/technical-clubs") // <-- This relative path is correct
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setClubs(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setError("Data format error. See console.");
        }
      })
      .catch((err) => {
        console.error("Error fetching technical clubs:", err);
        setError(err.message);
      });
  }, []);

  return (
    <>
      <Navbar page="technical"/>
      <div className="relative z-10 min-h-screen w-full">
        <div className="h-28"></div> {/* Spacer for fixed navbar */}

        <div className="text-center my-6">
          <h2 className="text-4xl font-bold text-red-600 tracking-wide uppercase drop-shadow-lg">
            Technical Clubs
          </h2>
          <p className="text-gray-700 mt-2 text-xl">
            Dive into coding, innovation, and tech-driven activities
          </p>
        </div>

        {/* Show an error message if something went wrong */}
        {error && (
          <div className="text-center my-10 p-4 bg-red-100 text-red-700 max-w-md mx-auto rounded-lg">
            <strong>Error:</strong> Failed to load club data. ({error})
          </div>
        )}

        {/* Show loading or club cards */}
        {clubs.length > 0 ? (
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
        ) : (
          !error && <p className="text-center text-gray-500">Loading clubs...</p>
        )}
      </div>
    </>
  );
}