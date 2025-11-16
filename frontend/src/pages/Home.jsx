import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the new homepage navbar
import ParticlesBg from '../components/ParticlesBg';
import FeaturedClubCard from '../components/FeaturedClubCard'; // Import the new card

// FAQ Accordion Item Component
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg">{question}</span>
          <svg
            className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h2>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="py-5 border-t border-gray-200">
          <p className="text-gray-500">{answer}</p>
        </div>
      </div>
    </div>
  );
};

// Main Home Component
export default function Home() {
  const [technicalClubs, setTechnicalClubs] = useState([]);
  const [nonTechnicalClubs, setNonTechnicalClubs] = useState([]);

  useEffect(() => {
    // Fetch technical clubs
    fetch('/api/technical-clubs')
      .then((res) => res.json())
      .then((data) => setTechnicalClubs(data))
      .catch((err) => console.error("Failed to fetch technical clubs:", err));

    // Fetch non-technical clubs
    fetch('/api/nontechnical-clubs')
      .then((res) => res.json())
      .then((data) => setNonTechnicalClubs(data))
      .catch((err) => console.error("Failed to fetch non-technical clubs:", err));
  }, []);

  return (
    <div className="bg-white text-gray-900 font-sans">
      <ParticlesBg />
      <Navbar />

      <style>{`
        .gradient-text-red {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .hero-btn {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.4), 0 8px 10px -6px rgba(220, 38, 38, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 35px -5px rgba(220, 38, 38, 0.5), 0 10px 15px -6px rgba(220, 38, 38, 0.4);
        }
        .scroll-container {
            overflow-x: auto;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
        .scroll-container::-webkit-scrollbar {
            display: none; /* Chrome, Safari, and Opera */
        }
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* --- Hero Section --- */}
      <section className="relative pt-48 pb-32 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                Welcome to <span className="gradient-text-red">ClubNexus</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                Your one-stop platform for discovering, joining, and engaging with all the vibrant clubs at Chitkara University.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link
                  to="/technical-clubs"
                  className="hero-btn text-white font-bold py-3 px-8 rounded-full text-lg"
                >
                  Explore Clubs
                </Link>
                <a
                  href="#about"
                  className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition hover:bg-gray-300"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/creative.png" 
                alt="Campus Life Illustration" 
                className="w-full max-w-md floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Technical Clubs Section --- */}
      <section id="technical-clubs" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Technical Clubs</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Innovate, build, and code with the brightest minds on campus.
          </p>
          <div className="flex space-x-8 pb-4 scroll-container">
            {technicalClubs.map((club) => (
              <FeaturedClubCard
                key={club.id}
                name={club.name}
                img={club.img}
                link={club.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Non-Technical Clubs Section --- */}
      <section id="non-technical-clubs" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Non-Technical Clubs</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Explore your passion in arts, culture, dance, and more.
          </p>
          <div className="flex space-x-8 pb-4 scroll-container">
            {nonTechnicalClubs.map((club) => (
              <FeaturedClubCard
                key={club.id}
                name={club.name}
                img={club.img}
                link={club.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="pr-0 md:pr-12">
              <h2 className="text-4xl font-bold mb-6">About <span className="gradient-text-red">ClubNexus</span></h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                ClubNexus is a centralized platform designed to bridge the gap between students and the diverse range of clubs and societies at Chitkara University. Our mission is to make it effortless for you to discover opportunities, connect with like-minded peers, and get involved in campus life.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                No more endless searching on different social media platforms. Find all club details, events, and contact information in one place. Whether you're into coding, dancing, literature, or robotics, your community is just a click away.
              </p>
            </div>
            <div>
              <img 
                src="/book.jpg" 
                alt="Students collaborating" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FaqItem
              question="What is ClubNexus?"
              answer="ClubNexus is a web platform for Chitkara University that lists all technical and non-technical clubs. It provides detailed information, event updates, and contact details, making it easy for students to discover and join clubs."
            />
            <FaqItem
              question="How do I join a club?"
              answer="You can browse the club lists on our 'Technical' and 'Non-Technical' pages. Each club has its own page with information about their recruitment process, events, and contact details. We recommend reaching out to the club coordinators listed on their page."
            />
            <FaqItem
              question="Is this an official university platform?"
              answer="ClubNexus is a student-developed project aimed at improving campus life. While not an official university website, it is designed to be a comprehensive and accurate resource for all students."
            />
            <FaqItem
              question="How can I add my club to the list?"
              answer="If you are a coordinator of a registered university club and would like to be featured, please reach out to us through our contact section (coming soon) or get in touch with the project development team."
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gradient-to-r from-red-600 via-red-800 to-black text-white pt-16 pb-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/logo.png" alt="ClubNexus Logo" className="h-16 w-auto mb-4" />
            <p className="text-gray-300">
              Your one-stop platform for discovering and connecting with all the clubs at Chitkara University.
            </p>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
              <li><a href="#about" className="hover:text-yellow-300">About Us</a></li>
              <li><a href="#faq" className="hover:text-yellow-300">FAQs</a></li>
              <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Discover</h5>
            <ul className="space-y-2">
              <li><Link to="/technical-clubs" className="hover:text-yellow-300">Technical Clubs</Link></li>
              <li><Link to="/nontechnical-clubs" className="hover:text-yellow-300">Non-Technical Clubs</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xl font-bold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-2xl hover:text-yellow-300"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-12 pt-8 border-t border-red-700">
          © 2024 ClubNexus. Developed by Students.
        </div>
      </footer>
    </div>
  );
}