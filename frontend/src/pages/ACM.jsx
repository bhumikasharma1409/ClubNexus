import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';

const slideshowImages = [
  '/firstacm.jpeg',
  '/secondacm.jpg',
  '/thirdacm.jpeg',
  '/fourthacm.jpeg',
];

const upcomingEvents = [
  {
    title: 'ACM Tech Talk: AI & Ethics',
    date: 'Dec 01, 2025',
    time: '3:00 PM - 4:00 PM',
    description:
      'Join us for a deep dive into the ethical implications of modern AI.',
  },
  {
    title: 'Hour of Code: Python Basics',
    date: 'Dec 08, 2025',
    time: '1:00 PM - 3:00 PM',
    description:
      'A beginner-friendly workshop introducing students to Python.',
  },
  {
    title: 'Research Paper Reading Session',
    date: 'Dec 15, 2025',
    time: '4:00 PM - 5:00 PM',
    description:
      'This month: "Attention Is All You Need". Break down and discuss.',
  },
];

export default function ACM() {
  const pageStyle = {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/acmCover.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={pageStyle} className="min-h-screen text-white">
      <Navbar />
      <div className="h-28"></div>

      <main className="container mx-auto px-4 py-10">
        <div className="bg-black bg-opacity-90 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-20 max-w-4xl mx-auto">

          {/* CLUB INTRO */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src="/acm.jpg"
              alt="ACM Club"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-400 shadow-lg"
            />

            <div className="text-center md:text-left mt-4">
              <h1 className="text-6xl font-extrabold text-blue-400 mb-3">
                ACM
              </h1>
              <p className="text-2xl text-gray-200 mb-4">
                Association for Computing Machinery
              </p>

              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://www.instagram.com/acm_cuiet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-pink-500 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/chitkara-acm-student-chapter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-300 hover:text-blue-500 transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Upcoming Events</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.title}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.description}
                />
              ))}
            </div>
          </div>

          {/* RECENT MOMENTS */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Recent Moments</h2>
            <Slideshow images={slideshowImages} />
          </div>

          {/* ABOUT US — FULL TEXT RESTORED */}
          <div className="mt-12 border-t border-gray-600 pt-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-300">About Us</h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Chitkara ACM Student Chapter is a student organization affiliated with
              the Association for Computing Machinery (ACM). Our goal is to create a
              powerful platform for students to connect, learn, and exchange knowledge.
              We organize various events such as technical training, non-technical
              training, and entertainment. ACM student chapters play an important role
              in fostering communication and collaboration within the computer science
              community and expanding these connections to the broader computing
              community.
            </p>

            <h3 className="text-2xl font-semibold text-blue-200 mt-6 mb-2">
              About What We Do & Who We Are
            </h3>

            <p className="text-lg text-gray-300 leading-relaxed">
              Our goal is to promote knowledge sharing, innovation, and effective
              communication among our members. ACM is recognized worldwide as the
              largest academic and computer science community. It brings together
              educators, researchers, and experts to promote dialogue, resource
              sharing, and collaborative problem-solving in the field.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
