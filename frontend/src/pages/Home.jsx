// src/pages/Home.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ParticlesBg from '../components/ParticlesBg';
import { useAuth } from '../context/AuthContext';

/* -------------------------
   useInViewAnimation hook (stable, callback ref)
   ------------------------- */
const useInViewAnimation = (options = {}) => {
  const [node, setNode] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (element) => {
      if (observerRef.current && node) {
        try {
          observerRef.current.unobserve(node);
        } catch (e) { }
      }
      setNode(element);
    },
    [node]
  );

  useEffect(() => {
    if (!node) return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          try {
            if (node) observer.unobserve(node);
          } catch (e) { }
        }
      },
      options
    );

    observer.observe(node);
    observerRef.current = observer;

    return () => {
      try {
        if (observerRef.current && node) observerRef.current.unobserve(node);
      } catch (e) { }
      if (observerRef.current && typeof observerRef.current.disconnect === 'function') {
        observerRef.current.disconnect();
      }
      observerRef.current = null;
    };
  }, [node, options]);

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
   Ultra Fast FaqItem Component
   ------------------------- */
/* -------------------------
   FaqItem — fully aligned + padded + bold
   ------------------------- */
const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full py-4 px-6 
                     text-left text-gray-800 font-serif font-bold transition-colors"
          onClick={onClick}
          aria-expanded={isOpen}
        >
          <span className="text-lg font-serif font-bold leading-snug break-words">
            {question}
          </span>

          <svg
            className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-200 
                       ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h2>

      <div
        className={`grid transition-all duration-200 ease-out 
                      ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-4">
            <p className="text-gray-700 font-serif leading-relaxed break-words">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


/* -------------------------
   Helpers
   ------------------------- */
const slugify = (name = '') =>
  name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* -------------------------
   Home component
   ------------------------- */
export default function Home() {
  const { user } = useAuth();
  const [technicalClubs, setTechnicalClubs] = useState([]);
  const [nonTechnicalClubs, setNonTechnicalClubs] = useState([]);
  const [faqOpen, setFaqOpen] = useState([false, false, false, false]);

  // SLIDESHOW STATE
  const slides = [
    '/second.jpg',


    '/fifth.jpg',
    '/third.jpg',
    '/fourth.jpg',
    '/sixth.jpg',
    '/seven.jpg',
    '/eight.jpg',
  ];

  // clone first slide at the end for smooth infinite loop
  const slidesExtended = [...slides, slides[0]];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIntervalRef = useRef(null);
  const trackRef = useRef(null);

  // --- ADDED GUARD ---
  const isSnappingRef = useRef(false);

  // autoplay: increment index (but guard while snapping)
  useEffect(() => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);

    slideIntervalRef.current = setInterval(() => {
      // don't increment while we're snapping back
      if (isSnappingRef.current) return;

      setCurrentSlide((prev) => {
        // clamp so we never go beyond the cloned index
        if (prev >= slides.length) return prev;
        return prev + 1;
      });
    }, 2000);

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
        slideIntervalRef.current = null;
      }
    };
  }, [slides.length]);

  // transitionend handler: when we've finished animating into the cloned slide,
  // snap the track instantly to the real first slide (0) without animation,
  // then restore transition and keep state in sync.
  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const onTransitionEnd = (e) => {
      // only act for the transform transition (ignore other transitions)
      if (e.propertyName !== 'transform') return;

      if (currentSlide === slides.length) {
        // mark that we're snapping to avoid interval increments
        isSnappingRef.current = true;

        // disable transition, snap transform to 0 (first real slide)
        node.style.transition = 'none';
        node.style.transform = `translateX(0)`; // instant snap

        // force reflow so the instant transform is applied immediately
        // eslint-disable-next-line no-unused-expressions
        node.getBoundingClientRect();

        // next frame: restore transition and sync React state to 0
        requestAnimationFrame(() => {
          node.style.transition = 'transform 600ms ease';
          // Keep UI/state consistent
          setCurrentSlide(0);

          // release snapping guard on next tick
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 0);
        });
      }
    };

    node.addEventListener('transitionend', onTransitionEnd);
    return () => node.removeEventListener('transitionend', onTransitionEnd);
  }, [currentSlide, slides.length]);

  // manual dot click
  const goToSlide = (idx) => {
    // ensure transition is enabled for manual jumps
    if (trackRef.current) trackRef.current.style.transition = 'transform 600ms ease';
    setCurrentSlide(idx);
  };


  useEffect(() => {
    fetch('/api/technical-clubs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed fetch');
        return res.json();
      })
      .then((data) => Array.isArray(data) && setTechnicalClubs(data))
      .catch(() => { });

    fetch('/api/nontechnical-clubs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed fetch');
        return res.json();
      })
      .then((data) => Array.isArray(data) && setNonTechnicalClubs(data))
      .catch(() => { });
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const defaultTech = [
    { id: 't1', name: 'Coding Ninja', icon: '/cn.jpg' },
    { id: 't2', name: 'ACM', icon: '/acm.jpg' },
    { id: 't3', name: 'IEEE', icon: '/ieee.webp' },
    { id: 't4', name: 'GFG', icon: '/gfg.jpeg' },
    { id: 't5', name: 'Open Source', icon: '/open.jpg' },
    { id: 't6', name: 'Bits n Byte', icon: '/bits.webp' },
    { id: 't7', name: 'GDSC', icon: '/google.jpg' },
    { id: 't8', name: 'Coding Blocks', icon: '/codingblocks.jpeg' },
  ];

  const defaultNonTech = [
    { id: 'n1', name: 'C2S2 Natraj', icon: '/natraj.jpeg' },
    { id: 'n2', name: 'C2S2 Literal', icon: '/literayllis.jpeg' },
    { id: 'n3', name: 'C2S2 Custody', icon: '/custody.jpeg' },
    { id: 'n4', name: 'C2S2 Dhwani', icon: '/dhwani.jpeg' },
    { id: 'n5', name: 'C2S2 Nati', icon: '/nati.jpg' },
    { id: 'n6', name: 'C2S2 Reflection', icon: '/reflection.jpeg' },
    { id: 'n7', name: 'C2S2 Bhangra Regiment', icon: '/bhangra.jpeg' },
    { id: 'n8', name: 'C2S2 Giddha', icon: '/giddha.jpeg' },
  ];

  return (
    <div className="bg-white text-gray-900 font-serif">
      <ParticlesBg />
      <Navbar />

      {/* animation + helper styles (replace slider-related styles with these) */}
      <style>{`
  .fade-slide-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
  .fade-slide-up.is-visible { opacity: 1; transform: translateY(0); }

  /* slider styles - updated */
  .hero-slider { width: 100%; height: 100%; overflow: hidden; position: relative; }
  .hero-slider-track { display: flex; transition: transform 600ms ease; /* no fixed width */ }
  .hero-slide { flex: 0 0 100%; width: 100%; height: 100%; }
  .hero-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .gradient-text-red {
    background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`}</style>

      {/* HERO */}
      <main id="home" className="flex flex-col md:flex-row items-center justify-between min-h-[75vh] px-4 md:px-28 font-serif pt-28">
        <AnimatedSection as="div" className="max-w-2xl text-left" delay="0.08s" threshold={0.05}>
          <span className="inline-block px-4 py-1 mb-6 text-sm font-serif font-medium text-blue-700 bg-blue-100 rounded-full shadow">
            College Clubs Made Simple
          </span>

          <h1 className="text-3xl md:text-6xl font-serif font-extrabold leading-tight text-gray-900">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-black">ClubNexus</span>
          </h1>

          <h2 className="mt-3 text-xl md:text-3xl font-serif font-bold text-gray-700">Discover • Register • Connect</h2>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            All your college events, in one place. Stay updated and never miss an opportunity again.

          </p>

          {!user && (
            <Link to="/register" className="mt-8 inline-block px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
              Get Started
            </Link>
          )}
        </AnimatedSection>

        <AnimatedSection className="mt-10 md:mt-0 md:ml-12 w-full md:w-4/5 lg:w-2/3 relative overflow-hidden rounded-2xl shadow-xl h-64 md:h-96" delay="0.24s" threshold={0.05}>
          {/* Slider */}
          <div className="hero-slider">
            <div
              ref={trackRef}
              className="hero-slider-track"
              style={{ transform: `translateX(-${currentSlide * 100} %)` }}
              aria-hidden={false}
            >
              {slidesExtended.map((src, i) => (
                <div className="hero-slide" key={i}>
                  <img src={src} alt={`slide - ${i} `} />
                </div>
              ))}
            </div>

            {/* small dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w - 2 h - 2 rounded - full ${currentSlide % slides.length === idx ? 'bg-white' : 'bg-white/40'} `}
                  aria-label={`Go to slide ${idx + 1} `}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>


      {/* TECH CLUBS LOGO ROW */}
      <div className="py-12 px-4 overflow-hidden">
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap opacity-90">
          {defaultTech.map((club, index) => (
            <div
              key={club.id}
              className="p-2"
            >
              <img
                src={club.icon}
                alt={club.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-red-100 shadow-sm club-logo-glow"
                title={club.name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CLUBS */}
      <AnimatedSection as="section" id="clubs" className="py-12 " threshold={0.12} delay="0.08s">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2 text-gray-900">Explore Our Clubs</h2>
          <p className="text-md text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Forge your path, connect, and thrive within our diverse college community.
          </p>

          {/* <-- increased spacing between boxes here --> */}
          <div className="flex flex-wrap lg:items-stretch gap-6 md:gap-16 lg:gap-24 justify-center">

            <AnimatedSection className="relative flex-1 min-w-[260px] max-w-[480px]" delay="0.12s">
              <Link to="/technical-clubs" className="block">
                <div className="relative rounded-2xl p-6 shadow-md overflow-hidden bg-gradient-to-r from-[#ffe5e5] via-[#fff1f1] to-white border border-transparent hover:shadow-xl hover:scale-105 transform transition-all duration-200 cursor-pointer">
                  <h3 className="text-2xl font-serif font-bold text-black mb-1">Technical Clubs</h3>
                  <p className="text-sm text-yellow-800 mb-6">Innovate, build, and code with the brightest minds on campus.</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {(technicalClubs && technicalClubs.length ? technicalClubs : defaultTech).slice(0, 8).map((club, i) => (
                      <div
                        key={club.id ?? i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/6 border border-white/6 transition-all duration-150"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-white/8 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
                          <img
                            src={club.icon || `/${slugify(club.name)}.jpg`}
                            alt={`${club.name} icon`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default.png'; }}
                          />
                        </div>

                        <span className="text-sm font-serif font-semibold text-black truncate">{club.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">

                  </div>
                </div>
              </Link>
            </AnimatedSection>


            <AnimatedSection className="relative flex-1 min-w-[260px] max-w-[480px]" delay="0.24s">
              <Link to="/nontechnical-clubs" className="block">
                <div className="relative rounded-2xl p-6 shadow-md overflow-hidden bg-gradient-to-r from-[#ffe5e5] via-[#fff1f1] to-white border border-transparent hover:shadow-xl hover:scale-105 transform transition-all duration-200 cursor-pointer">
                  <h3 className="text-2xl font-serif font-bold text-black mb-1">Non-Technical Clubs</h3>
                  <p className="text-sm text-yellow-800 mb-6">Explore your passion in arts, culture, dance, and more.</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {(nonTechnicalClubs && nonTechnicalClubs.length ? nonTechnicalClubs : defaultNonTech).slice(0, 8).map((club, i) => (
                      <div
                        key={club.id ?? i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/6 border border-white/6 transition-all duration-150"
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-white/8 flex items-center justify-center flex-shrink-0 ring-1 ring-white/10">
                          <img
                            src={club.icon || `/${slugify(club.name)}.jpg`}
                            alt={`${club.name} icon`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default.png'; }}
                          />
                        </div>

                        <span className="text-sm font-serif font-semibold text-black truncate">{club.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">

                  </div>
                </div>
              </Link>
            </AnimatedSection>


          </div>
        </div>
      </AnimatedSection>

      {/* ABOUT */}
      <AnimatedSection
        as="section"
        id="about"
        className="min-h-screen flex items-center justify-center relative bg-transparent py-12 md:py-24"
        threshold={0.3}
        delay="0.12s"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-serif">About ClubNexus</h2>

          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            ClubNexus is your one-stop platform to explore, join, and participate in vibrant college clubs and events.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.1s">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Our Vision</h3>
              <p className="mt-3 text-gray-600">To create an inclusive platform where every student finds their club, develops skills, and builds lifelong connections.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.2s">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Our Mission</h3>
              <p className="mt-3 text-gray-600">To simplify the way students engage with clubs and events by providing a smooth and modern digital platform.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.3s">
              <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Why Join?</h3>
              <p className="mt-3 text-gray-600">Be part of a dynamic community, unlock opportunities, and grow both personally and professionally.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.4s">
              <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Student Growth</h3>
              <p className="mt-3 text-gray-600">Clubs help students build technical, cultural, and leadership skills that boost confidence and real-world readiness.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.5s">
              <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Event Management</h3>
              <p className="mt-3 text-gray-600">Organize college events seamlessly. Manage registrations, schedules, announcements, and member interaction — all in one spot.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-white/80 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 backdrop-blur-md shadow-xl rounded-xl p-6" delay="0.6s">
              <h3 className="text-xl font-serif font-semibold bg-gradient-to-r from-red-600 via-red-800 to-black bg-clip-text text-transparent">Access to Opportunities</h3>
              <p className="mt-3 text-gray-600">Get early access to hackathons, competitions, workshops, club recruitments, and exclusive campus announcements.</p>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection as="section" id="faq" className="py-12 md:py-24 mb-12 lg:mb-20 bg-gradient-to-r from-red-50 via-pink-50 to-red-100 relative z-10" threshold={0.1} delay="0.08s">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 font-serif">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 text-center">Get quick answers to the most common questions about ClubNexus</p>

          <div className="mt-14 space-y-5">
            <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.1s">
              <FaqItem
                question="What is ClubNexus?"
                answer="ClubNexus is a digital hub designed to connect students with clubs and events in their college. It serves as a central platform where you can explore different groups, view upcoming activities, and get the latest updates. Instead of searching on notice boards or WhatsApp groups, everything is organized neatly in one place for convenience."
                isOpen={faqOpen[0]}
                onClick={() => toggleFaq(0)}
              />
            </AnimatedSection>

            <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.2s">
              <FaqItem
                question="How can I register for a club?"
                answer="Registering is simple — just head over to the 'Clubs' section, choose your favorite club, and click on its registration link. Some clubs may redirect you to an official form, while others might allow direct registration within ClubNexus itself. You'll also get confirmation details and updates so you never miss an important announcement."
                isOpen={faqOpen[1]}
                onClick={() => toggleFaq(1)}
              />
            </AnimatedSection>

            <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.3s">
              <FaqItem
                question="Is ClubNexus free to use?"
                answer="Yes, ClubNexus is completely free for all students. Our goal is to make it easy for everyone to discover clubs, register for events, and connect with peers without any barriers. All you need is your college identity to get started, and you're good to go!"
                isOpen={faqOpen[2]}
                onClick={() => toggleFaq(2)}
              />
            </AnimatedSection>

            <AnimatedSection className="group border border-gray-200 rounded-2xl shadow-md bg-white/80 backdrop-blur-md transition hover:shadow-xl overflow-hidden" delay="0.4s">
              <FaqItem
                question="Can I join multiple clubs?"
                answer="Absolutely! ClubNexus encourages students to explore multiple interests. You might be passionate about coding but also want to try music, arts, or debating. Joining more than one club helps you build diverse skills, meet new people, and enrich your college journey."
                isOpen={faqOpen[3]}
                onClick={() => toggleFaq(3)}
              />
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Quote card (hidden by default) */}
      <div id="quoteCard" className="hidden lg:block fixed bottom-10 right-10 w-80 bg-white rounded-xl shadow-2xl p-5 opacity-0 pointer-events-none transition-opacity duration-500 z-50">
        <p id="cardText" className="text-gray-800 text-lg italic"></p>
        <p id="cardAuthor" className="text-gray-600 text-sm mt-2 text-right">— Unknown</p>
      </div>

      {/* FOOTER (component) */}
      <Footer />

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
