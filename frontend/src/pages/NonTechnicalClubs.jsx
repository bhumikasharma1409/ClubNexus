// src/pages/NonTechnicalClubsNoAPI.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ParticlesBg from "../components/ParticlesBg";

export default function NonTechnicalClubsNoAPI() {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [popupText, setPopupText] = useState("");

  const clubs = [
    {
      id: 1,
      img: "/literayllis.jpeg",
      name: "Literayllis",
      desc: "The official literary society that celebrates poetry, debate, and storytelling.",
      insta: "https://www.instagram.com/c2s2_literayllis?igsh=N3ZlcTNhOGF3d3Yz",
      link: "/club/literayllis",
    },
    {
      id: 2,
      img: "/dhwani.jpeg",
      name: "Dhwani",
      desc: "The music club that unites singers and instrumentalists to create soulful melodies.",
      insta: "https://www.instagram.com/c2s2__dhwani?igsh=MXFhNmoxaXV6N2k1YQ==",
      link: "/club/dhwani",
    },
    {
      id: 3,
      img: "/nati.jpg",
      name: "Nati",
      desc: "The dramatics club, showcasing stage plays, skits, and street theatre performances.",
      insta: "https://www.instagram.com/c2s2_nati_?igsh=MXNneGVsOGtyY2VyeQ==",
      link: "/club/nati",
    },
    {
      id: 4,
      img: "/custody.jpeg",
      name: "Custody",
      desc: "The dance club, where passion meets rhythm and creativity takes the stage.",
      insta: "https://www.instagram.com/c2s2_custody?igsh=aWNsMnJ5aDN4cXhh",
      link: "/club/custody",
    },
    {
      id: 5,
      img: "/bhangra.jpeg",
      name: "The Bhangra Regiment",
      desc: "A high-energy bhangra crew spreading Punjabi culture through dance and enthusiasm.",
      insta: "https://www.instagram.com/c2s2_thebhangraregiment?igsh=bXZudDZxNTk0ZWti",
      link: "/club/bhangra-regiment",
    },
    {
      id: 6,
      img: "/reflection.jpeg",
      name: "Reflection",
      desc: "The photography and cinematography club capturing creativity through the lens.",
      insta: "https://www.instagram.com/c2s2_reflection?igsh=MXQxdnlmamU1cDQxcQ==",
      link: "/club/reflection",
    },
    {
      id: 7,
      img: "/giddha.jpeg",
      name: "Lethal Giddha Squad",
      desc: "A dynamic all-girls team reviving traditional Punjabi giddha with a modern touch.",
      insta: "https://www.instagram.com/c2s2_lethal_giddha_squad?igsh=ODZkMGx3bzNhbXdo",
      link: "/club/giddha-squad",
    },
    {
      id: 8,
      img: "/natraj.jpeg",
      name: "Natraj",
      desc: "The classical dance club dedicated to Bharatanatyam, Kathak, and Odissi traditions.",
      insta: "https://www.instagram.com/c2s2_natraj?igsh=MWl6em1mczYwdnM4aQ==",
      link: "/club/natraj",
    },
  ];

  useEffect(() => {
    const id = "fa-cdn";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);
    }
  }, []);

  const handleLearnMore = (e, href) => {
    e.preventDefault();
    setPopupText("Thank you🎉! Redirecting...");
    setRedirecting(true);

    setTimeout(() => {
      navigate(href);
    }, 1800);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 font-serif relative">
      <ParticlesBg />

      <div className="relative z-10">
        <Navbar />
        <div className="h-28" />

        {/* Header (Banner removed here) */}
        <div className="text-center my-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 tracking-wide uppercase drop-shadow-lg">
            Non-Technical Clubs
          </h2>
          <p className="text-gray-700 mt-2 text-lg md:text-xl">
            Explore the creative and cultural sides of campus life
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative z-10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-24">

          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-gradient-to-b from-pink-100 to-red-100
                         border border-red-200
                         rounded-2xl shadow-md hover:shadow-xl
                         transition transform hover:scale-[1.03]
                         p-4 flex flex-col justify-between min-h-[340px]"
            >
              <div className="flex justify-center">
                <img
                  src={club.img}
                  className="w-full h-40 object-contain rounded-lg bg-white p-2"
                  alt={club.name}
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-bold text-black text-center">{club.name}</h2>
                <p className="text-gray-700 text-center text-sm mt-2">{club.desc}</p>
              </div>

              <div className="flex justify-center space-x-4 mt-4 text-2xl">
                <a href={club.insta} target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram text-pink-600"></i>
                </a>
              </div>

              <div className="mt-5 px-1">
                <a
                  href={club.link}
                  onClick={(e) => handleLearnMore(e, club.link)}
                  className="block w-full bg-black text-white 
                             py-2 rounded-full text-center 
                             font-semibold shadow-md 
                             hover:bg-gray-900 transition"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>

      {redirecting && (
        <div
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-3 rounded z-50"
        >
          {popupText}
        </div>
      )}
    </div>
  );
}
