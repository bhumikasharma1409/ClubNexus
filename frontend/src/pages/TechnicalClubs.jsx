// src/pages/TechnicalClubsNoAPI.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ParticlesBg from "../components/ParticlesBg";

export default function TechnicalClubsNoAPI() {
  const [redirecting, setRedirecting] = useState(false);
  const [popupText, setPopupText] = useState("");

  const clubs = [
    { id: 1, img: "/cn.jpg", name: "Coding Ninjas", desc: "Sharpen coding skills with contests, projects, and mentorship.", insta: "https://www.instagram.com/codingninjas_cuiet?igsh=MWVrbGxrOWxwc2Frag==", linkedin: "https://www.linkedin.com/company/codingninjas-cuiet/", link: "/CodingNinjas.html" },
    { id: 2, img: "/ieee.webp", name: "IEEE", desc: "Innovate with technology, research, and professional networking.", insta: "https://www.instagram.com/ieeeciet?igsh=MWxqMmJtcDU4em9zcw==", linkedin: "https://www.linkedin.com/company/ieee-ciet-student-branch/", link: "/IEEE.html" },
    { id: 3, img: "/gfg.jpeg", name: "GFG Student Chapter", desc: "Dive into open source contributions and problem solving.", insta: "https://www.instagram.com/gfg_cuiet?igsh=bnptdWtsZTRlcWFq", linkedin: "#", link: "/GFG.html" },
    { id: 4, img: "/acm.jpg", name: "ACM", desc: "Advance computing with workshops, papers, and events.", insta: "https://www.instagram.com/acm_cuiet?igsh=MW50Zzc1ZWd0bHJxYQ==", linkedin: "https://www.linkedin.com/company/chitkara-acm-student-chapter/", link: "/ACM.html" },
    { id: 5, img: "/open.jpg", name: "Open Source", desc: "Contribute to real-world projects and collaborate globally.", insta: "https://www.instagram.com/opensourcechandigarh?igsh=NHZldWJkbmVleTBs", linkedin: "https://www.linkedin.com/company/open-source-chandigarh/", link: "/coding-ninjas.html" },
    { id: 6, img: "/bits.webp", name: "Bit N Bytes", desc: "Explore coding, gaming, and fun digital competitions.", insta: "https://www.instagram.com/bits_nbytes?igsh=aWtwNWZscW5kZmsy", linkedin: "https://www.linkedin.com/company/bits-n-bytes-chitkara/", link: "/coding-ninjas.html" },
    { id: 7, img: "/google.jpg", name: "GDSC", desc: "Learn and build using Google technologies with peers.", insta: "#", linkedin: "#", link: "/coding-ninjas.html" },
    { id: 8, img: "/codingblocks.jpeg", name: "Coding Blocks", desc: "Master programming with bootcamps, courses, and events.", insta: "https://www.instagram.com/codingblocks_cuiet?igsh=MXZtNDR6YmV5dnJrdg==", linkedin: "https://www.linkedin.com/company/coding-blocks-cuiet-chapter/", link: "/coding-ninjas.html" },
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
      window.location.href = href;
    }, 1800);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 font-serif relative">

      <ParticlesBg />

      <div className="relative z-10">
        <Navbar />
        <div className="h-28" />

        <div className="text-center my-6">
          <h2 className="text-4xl font-bold text-red-600 tracking-wide uppercase drop-shadow-lg">
            Technical Clubs
          </h2>
          <p className="text-gray-700 mt-2 text-xl">
            Dive into coding, innovation, and tech-driven activities
          </p>
        </div>

        {/* Cards grid */}
        <div className="p-6 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

          {clubs.map((club) => (
  <div key={club.id}
       className="bg-gradient-to-b from-pink-100 to-red-100
                  border border-red-200
                  rounded-2xl shadow-md hover:shadow-xl
                  transition transform hover:scale-[1.03]
                  p-4">

    <div className="flex justify-center">
      <img src={club.img}
           className="w-28 h-28 object-contain rounded-xl"
           alt={club.name} />
    </div>

    <h2 className="text-xl font-bold text-black text-center mt-3">{club.name}</h2>
    <p className="text-gray-700 text-center text-sm mt-2">{club.desc}</p>

    <div className="flex justify-center space-x-4 mt-4 text-xl">
      <a href={club.insta} target="_blank"><i className="fab fa-instagram text-pink-600"></i></a>
      <a href={club.linkedin} target="_blank"><i className="fab fa-linkedin text-blue-600"></i></a>
    </div>

    <div className="mt-5">
      <a href={club.link}
         onClick={(e) => handleLearnMore(e, club.link)}
         className="block w-full bg-black text-white 
                    py-2 rounded-full text-center 
                    font-semibold shadow-md 
                    hover:bg-gray-900 transition">
        Learn More →
      </a>
    </div>

  </div>
))}


        </div>

        <Footer />
      </div>

      {redirecting && (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        bg-black text-white px-6 py-3 rounded z-50">
          {popupText}
        </div>
      )}
    </div>
  );
}
