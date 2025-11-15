import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarNonTechnical";
import ClubCard from "../components/ClubCard";

export default function NonTechnicalClubs() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // This is the updated fetch call
    fetch("/api/nontechnical-clubs") // <-- Correct relative path
      .then((res) => {
        if (!res.ok) {
          // Handle HTTP errors like 500 or 404
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure the data is an array before setting it
        if (Array.isArray(data)) {
          setClubs(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setError("Data format error. See console.");
        }
      })
      .catch((err) => {
        // Catch network errors or the error thrown above
        console.error("Error fetching non-technical clubs:", err);
        setError(err.message);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <Navbar page="nontechnical"/>

      {/* Page Wrapper */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="h-28"></div> {/* Spacer for fixed navbar */}

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

        {/* Show an error message if something went wrong */}
        {error && (
          <div className="text-center my-10 p-4 bg-red-100 text-red-700 max-w-md mx-auto rounded-lg">
            <strong>Error:</strong> Failed to load club data. ({error})
          </div>
        )}

        {/* Club Cards Grid: Show loading or the clubs */}
        {clubs.length > 0 ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {clubs.map((club) => (
              <ClubCard
                key={club.id}
                img={club.img}
                name={club.name}
                desc={club.desc}
                insta={club.insta}
                linkedin={club.linkedin} // Note: this prop exists but may be unused for non-tech
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