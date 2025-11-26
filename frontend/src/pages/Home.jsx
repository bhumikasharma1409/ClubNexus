// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticlesBg from '../components/ParticlesBg';

/* -------------------------
   useInViewAnimation hook
   ------------------------- */
const useInViewAnimation = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
};

/* -------------------------
   AnimatedSection component
   ------------------------- */
const AnimatedSection = ({ children, className = '', delay = '0s', threshold = 0.12, as: Element = 'div', id = null }) => {
  const [ref, isVisible] = useInViewAnimation({ threshold });

  const animationStyles = {
    transitionDelay: delay,
  };

  return (
    <Element
      ref={ref}
      id={id || undefined}
      className={`${className} fade-slide-up ${isVisible ? 'is-visible' : ''}`}
      style={animationStyles}
    >
      {children}
    </Element>
  );
};

/* -------------------------
   FaqItem (stateless controlled)
   ------------------------- */
const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-4 font-medium text-left text-gray-700"
          onClick={onClick}
        >
          <span className="text-lg">{question}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h2>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="py-4 border-t border-gray-200">
          <p className="text-gray-500">{answer}</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------
   Home component
   ------------------------- */
export default function Home() {
  const [technicalClubs, setTechnicalClubs] = useState([]);
  const [nonTechnicalClubs, setNonTechnicalClubs] = useState([]);
  const [faqOpen, setFaqOpen] = useState([false, false, false, false]);

  useEffect(() => {
    fetch('/api/technical-clubs')
      .then((res) => res.json())
      .then((data) => setTechnicalClubs(data))
      .catch((err) => console.error('Failed to fetch technical clubs:', err));

    fetch('/api/nontechnical-clubs')
      .then((res) => res.json())
      .then((data) => setNonTechnicalClubs(data))
      .catch((err) => console.error('Failed to fetch non-technical clubs:', err));
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const defaultTech = [
    { id: 't1', name: 'Coding Ninja' },
    { id: 't2', name: 'ACM' },
    { id: 't3', name: 'IEEE' },
    { id: 't4', name: 'GFG' },
    { id: 't5', name: 'Open Source' },
    { id: 't6', name: 'Bits n Byte' },
    { id: 't7', name: 'GDSC' },
    { id: 't8', name: 'Coding Blocks' }
  ];

  const defaultNonTech = [
    { id: 'n1', name: 'C2S2 Natraj' },
    { id: 'n2', name: 'C2S2 Literal' },
    { id: 'n3', name: 'C2S2 Custody' },
    { id: 'n4', name: 'C2S2 Dhwani' },
    { id: 'n5', name: 'C2S2 Nati' },
    { id: 'n6', name: 'C2S2 Reflection' },
    { id: 'n7', name: 'C2S2 Bhangra Regiment' },
    { id: 'n8', name: 'C2S2 Giddha' }
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <ParticlesBg />
      <Navbar />

      {/* animation + helper styles */}
      <style>{`
        .fade-slide-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .fade-slide-up.is-visible { opacity: 1; transform: translateY(0); }
        .gradient-text-red {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-btn {
          background: linear-gradient(90deg, #ffd166 0%, #f7c948 100%);
          color: #111827;
          box-shadow: 0 8px 20px -8px rgba(0,0,0,0.4);
          transition: all 0.18s ease;
        }
        .hero-btn:hover { transform: translateY(-2px); filter: brightness(1.03); }
      `}</style>

      {/* HERO */}
      <main id="home" className="flex flex-col md:flex-row items-center justify-between min-h-screen px-8 md:px-28 font-serif pt-20">
        <AnimatedSection as="div" className="max-w-2xl text-left" delay="0.08s" threshold={0.05}>
          <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full shadow">
            College Clubs Made Simple
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Welcome to <span className="text-transparent bg-clip-text  bg-gradient-to-r from-red-600 via-red-800 to-black">ClubNexus</span>
          </h1>

          <h2 className="mt-3 text-xl md:text-3xl font-bold text-gray-700">Discover • Register • Connect</h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            All your college events, in one place. Stay updated and never miss an opportunity again.
          </p>

          
        </AnimatedSection>

        <AnimatedSection className="mt-10 md:mt-0 md:ml-12 w-full md:w-4/5 lg:w-2/3 relative overflow-hidden rounded-2xl shadow-xl h-72 md:h-96" delay="0.24s" threshold={0.05}>
          <div id="slider" className="flex transition-transform duration-700 h-full">
            <img src="/first.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide1" />
            <img src="/fourth.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide2" />
            <img src="/second.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide3" />
            <img src="/fifth.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide4" />
            <img src="/third.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide5" />
            <img src="/sixth.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide6" />
            <img src="/seven.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide7" />
            <img src="/eight.jpg" className="w-full flex-shrink-0 h-full object-cover" alt="slide8" />
          </div>
        </AnimatedSection>
      </main>

      {/* CLUBS */}
      <AnimatedSection as="section" id="clubs" className="py-12 bg-gradient-to-b from-gray-50 to-white" threshold={0.12} delay="0.08s">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">Explore Our Clubs</h2>
          <p className="text-md text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Forge your path, connect, and thrive within our diverse college community.
          </p>

          <div className="flex flex-wrap lg:items-stretch gap-6 lg:gap-8 justify-center">
            <AnimatedSection className="relative flex-1 min-w-[260px] max-w-[480px] rounded-2xl p-6 shadow-md overflow-hidden bg-gradient-to-r from-red-600 via-red-800 to-black border border-transparent" delay="0.12s">
              <div className="pointer-events-none absolute inset-0 opacity-9">
                <svg className="absolute top-6 right-8 w-6 h-6 text-yellow-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-1">Technical Clubs</h3>
              <p className="text-sm text-yellow-100 mb-6">Innovate, build, and code with the brightest minds on campus.</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {(technicalClubs && technicalClubs.length ? technicalClubs : defaultTech).slice(0, 8).map((club, i) => (
                  <Link
                    key={club.id ?? i}
                    to={`/club/${encodeURIComponent(club.name)}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/6 border border-white/6 hover:border-yellow-300 hover:shadow-md transition-all duration-150"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>

                    <span className="text-sm font-serif font-semibold text-white/90 truncate">{club.name}</span>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link to="/technical-clubs" className="inline-block text-sm font-serif font-bold py-2 px-5 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-shadow shadow-md">
                  View All Technical Clubs →
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex flex-col items-center justify-center w-[96px] mt-10 lg:mt-0" delay="0.18s">
              <div className="h-[160px] w-[1px] bg-gradient-to-b from-transparent to-gray-300 hidden lg:block"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 via-red-800 to-black shadow-md -mt-8 flex items-center justify-center border border-red-200 relative">
                <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center border-2 border-white/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h4" stroke="#991b1b" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M17 12h4" stroke="#991b1b" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="8" cy="12" r="1" fill="#991b1b"/>
                    <circle cx="16" cy="12" r="1" fill="#991b1b"/>
                  </svg>
                </div>
              </div>
              <div className="h-[160px] w-[1px] bg-gradient-to-b from-gray-300 to-transparent hidden lg:block mt-6"></div>
            </AnimatedSection>

            <AnimatedSection className="relative flex-1 min-w-[260px] max-w-[480px] rounded-2xl p-6 shadow-md overflow-hidden bg-gradient-to-r from-red-600 via-red-800 to-black border border-transparent" delay="0.24s">
              <div className="pointer-events-none absolute inset-0 opacity-9">
                <svg className="absolute top-6 right-10 w-6 h-6 text-yellow-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-1">Non-Technical Clubs</h3>
              <p className="text-sm text-yellow-100 mb-6">Explore your passion in arts, culture, dance, and more.</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {(nonTechnicalClubs && nonTechnicalClubs.length ? nonTechnicalClubs : defaultNonTech).slice(0, 8).map((club, i) => (
                  <Link
                    key={club.id ?? i}
                    to={`/club/${encodeURIComponent(club.name)}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/6 border border-white/6 hover:border-yellow-300 hover:shadow-md transition-all duration-150"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif font-semibold text-white/90 truncate">{club.name}</span>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link to="/nontechnical-clubs" className="inline-block text-sm font-serif font-bold py-2 px-5 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-shadow shadow-md">
                  View All Cultural Clubs →
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* ABOUT */}
      <AnimatedSection as="section" id="about" className="h-screen flex items-center justify-center relative bg-transparent" threshold={0.3} delay="0.12s">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 font-serif">About ClubNexus</h2>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            ClubNexus is your one-stop platform to explore, join, and participate in vibrant college clubs and events.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6" delay="0.1s">
              <h3 className="text-xl font-semibold text-red-600">Our Vision</h3>
              <p className="mt-3 text-gray-600">To create an inclusive platform where every student finds their club, develops skills, and builds lifelong connections.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6" delay="0.3s">
              <h3 className="text-xl font-semibold text-red-600">Our Mission</h3>
              <p className="mt-3 text-gray-600">To simplify the way students engage with clubs and events by providing an easy-to-use digital platform.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6" delay="0.5s">
              <h3 className="text-xl font-semibold text-red-600">Why Join?</h3>
              <p className="mt-3 text-gray-600">Be part of a dynamic community, unlock opportunities, and grow both personally and professionally.</p>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
<AnimatedSection as="section" id="faq" className="py-24 mb-12 lg:mb-20 bg-gradient-to-r from-red-50 via-pink-50 to-red-100 relative z-10" threshold={0.1} delay="0.08s">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-5xl font-extrabold text-center text-gray-900 font-serif">Frequently Asked Questions</h2>
    <p className="mt-4 text-lg text-gray-600 text-center">Get quick answers to the most common questions about ClubNexus.</p>

    <div className="mt-14 space-y-5">
      {/* Item 1 */}
      <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.1s">
        <button
          onClick={() => toggleFaq(0)}
          className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800"
        >
          <span>What is ClubNexus?</span>
          <span className={`faq-icon transition-transform duration-300 text-red-500 ${faqOpen[0] ? 'transform rotate-45' : ''}`}>
            {faqOpen[0] ? '−' : '+'}
          </span>
        </button>
        <div className={`faq-answer overflow-hidden px-6 text-gray-600 transition-all duration-500 ease-in-out ${faqOpen[0] ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <p>
            ClubNexus is a digital hub designed to connect students with clubs and events in their college.
            It serves as a central platform where you can explore different groups, view upcoming activities, and get the latest updates.
            Instead of searching on notice boards or WhatsApp groups, everything is organized neatly in one place for convenience.
          </p>
        </div>
      </AnimatedSection>

      {/* Item 2 */}
      <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.2s">
        <button
          onClick={() => toggleFaq(1)}
          className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800"
        >
          <span>How can I register for a club?</span>
          <span className={`faq-icon transition-transform duration-300 text-red-500 ${faqOpen[1] ? 'transform rotate-45' : ''}`}>
            {faqOpen[1] ? '−' : '+'}
          </span>
        </button>
        <div className={`faq-answer overflow-hidden px-6 text-gray-600 transition-all duration-500 ease-in-out ${faqOpen[1] ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <p>
            Registering is simple — just head over to the “Clubs” section, choose your favorite club, and click on its registration link.
            Some clubs may redirect you to an official form, while others might allow direct registration within ClubNexus itself.
            You'll also get confirmation details and updates so you never miss an important announcement.
          </p>
        </div>
      </AnimatedSection>

      {/* Item 3 */}
      <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.3s">
        <button
          onClick={() => toggleFaq(2)}
          className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800"
        >
          <span>Is ClubNexus free to use?</span>
          <span className={`faq-icon transition-transform duration-300 text-red-500 ${faqOpen[2] ? 'transform rotate-45' : ''}`}>
            {faqOpen[2] ? '−' : '+'}
          </span>
        </button>
        <div className={`faq-answer overflow-hidden px-6 text-gray-600 transition-all duration-500 ease-in-out ${faqOpen[2] ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <p>
            Yes, ClubNexus is completely free for all students.
            Our goal is to make it easy for everyone to discover clubs, register for events, and connect with peers without any barriers.
            All you need is your college identity to get started, and you’re good to go!
          </p>
        </div>
      </AnimatedSection>

      {/* Item 4 */}
      <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.4s">
        <button
          onClick={() => toggleFaq(3)}
          className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-semibold text-gray-800"
        >
          <span>Can I join multiple clubs?</span>
          <span className={`faq-icon transition-transform duration-300 text-red-500 ${faqOpen[3] ? 'transform rotate-45' : ''}`}>
            {faqOpen[3] ? '−' : '+'}
          </span>
        </button>
        <div className={`faq-answer overflow-hidden px-6 text-gray-600 transition-all duration-500 ease-in-out ${faqOpen[3] ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <p>
            Absolutely! ClubNexus encourages students to explore multiple interests.
            You might be passionate about coding but also want to try music, arts, or debating.
            Joining more than one club helps you build diverse skills, meet new people, and enrich your college journey.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </div>
</AnimatedSection>


      {/* Quote card (hidden by default) */}
      <div id="quoteCard" className="fixed bottom-10 right-10 w-80 bg-white rounded-xl shadow-2xl p-5 opacity-0 pointer-events-none transition-opacity duration-500 z-50">
        <p id="cardText" className="text-gray-800 text-lg italic"></p>
        <p id="cardAuthor" className="text-gray-600 text-sm mt-2 text-right">— Unknown</p>
      </div>

      {/* Footer (inline wave + content) */}
      <AnimatedSection as="footer" className="relative bg-gradient-to-r from-red-600 via-red-800 to-black text-white" threshold={0.08} delay="0.12s">
        <div className="pointer-events-none -mt-1">
          <svg viewBox="0 0 1440 180" className="w-full h-28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="60%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <path d="M0,90 Q360,10 720,90 T1440,90 L1440,180 L0,180 Z" fill="url(#waveGrad)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 py-5 md:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-start">
            <div className="space-y-3">
              <img src="/logo.png" alt="ClubNexus Logo" className="h-12 w-auto mb-1" />
              <p className="text-sm text-gray-300 max-w-xs">Your one-stop platform for discovering and connecting with all the clubs at Chitkara University.</p>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-2 text-white/90">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
                <li><a href="#about" className="hover:text-yellow-300">About</a></li>
                <li><a href="#faq" className="hover:text-yellow-300">FAQs</a></li>
                <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-2 text-white/90">Follow Us</h5>
              <div className="flex items-center space-x-4">
                <a href="#" aria-label="Instagram" className="text-xl hover:text-yellow-300">IG</a>
                <a href="#" aria-label="LinkedIn" className="text-xl hover:text-yellow-300">IN</a>
                <a href="#" aria-label="GitHub" className="text-xl hover:text-yellow-300">GH</a>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-red-700/40 pt-3 text-center">
            <p className="text-xs text-gray-300">© 2025 ClubNexus — Developed by Students</p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
