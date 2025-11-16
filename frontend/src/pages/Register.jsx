import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // <-- FIX: Removed .jsx
import { useNavigate, Link } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg"; // <-- FIX: Removed .jsx

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    batch: "",
    course: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password toggle
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // --- YOUR EXISTING LOGIC (UNCHANGED) ---
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      }

      login(data.user, data.token);
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // --- END OF YOUR LOGIC ---
  };

  // Styles from your HTML file
  const inputFieldClass = "input-field w-full px-4 py-3.5 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none text-sm";
  const btnPrimaryClass = "btn-primary w-full text-white font-bold py-4 px-6 rounded-xl mt-8 text-sm tracking-wide relative flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <>
      <ParticlesBg />
      <style>{`
        body {
            background: linear-gradient(135deg, #ffffff 0%, #fef2f2 50%, #ffffff 100%);
        }
        .card-shadow {
            box-shadow: 
                0 20px 60px -10px rgba(220, 38, 38, 0.15),
                0 10px 30px -5px rgba(0, 0, 0, 0.05);
        }
        .input-field {
            background: #ffffff;
            border: 2px solid #fee2e2;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-field:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
        }
        .input-field:hover {
            border-color: #fca5a5;
        }
        .gradient-text {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .btn-primary {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            box-shadow: 
                0 10px 25px -5px rgba(220, 38, 38, 0.4),
                0 8px 10px -6px rgba(220, 38, 38, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 
                0 20px 35px -5px rgba(220, 38, 38, 0.5),
                0 10px 15px -6px rgba(220, 38, 38, 0.4);
        }
        .btn-primary:active { transform: translateY(0); }
        .floating { animation: floating 3s ease-in-out infinite; }
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        .decorative-circle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%);
            pointer-events: none;
        }
        .circle-1 { width: 300px; height: 300px; top: -150px; right: -100px; }
        .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -50px; }
        .select-arrow {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%23dc2626%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3e%3c/svg%3e");
          background-size: 1.5em;
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
        }
      `}</style>
      
      <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative z-10">
        <div className="absolute top-4 right-6">
          <Link
            to="/"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
          >
            Go to Homepage
          </Link>
        </div>

        <div className="relative w-full max-w-md">
          <div className="text-center mb-10 floating">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-black gradient-text mb-2 tracking-tight">
                ClubNexus
              </h1>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm mt-4 font-medium tracking-wide">
              Your gateway to campus events
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 card-shadow relative overflow-hidden">
            <div className="decorative-circle circle-1"></div>
            <div className="decorative-circle circle-2"></div>
            
            {error && <p className="text-red-600 text-center mb-4 text-sm font-medium">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                  className={inputFieldClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  onChange={handleChange}
                  required
                  className={inputFieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="year"
                    className="block text-gray-800 text-sm font-semibold"
                  >
                    Year
                  </label>
                  <select
                    id="year"
                    onChange={handleChange}
                    required
                    className={`${inputFieldClass} select-arrow cursor-pointer`}
                  >
                    <option value="">Select</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="batch"
                    className="block text-gray-800 text-sm font-semibold"
                  >
                    Batch
                  </label>
                  <input
                    id="batch"
                    type="text"
                    placeholder="2021-2025"
                    onChange={handleChange}
                    required
                    className={inputFieldClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="course"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Course
                </label>
                <select
                  id="course"
                  onChange={handleChange}
                  required
                  className={`${inputFieldClass} select-arrow cursor-pointer`}
                >
                  <option value="">Select your course</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="BBA">Business Administration</option>
                  <option value="BCA">Computer Applications</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-gray-800 text-sm font-semibold"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 6 chars)"
                    onChange={handleChange}
                    required
                    className={`${inputFieldClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? (
                      <svg id="eyeClosed" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      </svg>
                    ) : (
                      <svg id="eyeOpen" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={btnPrimaryClass}
              >
                {loading && (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                <span>
                  {loading ? "Creating Account..." : "Create Account"}
                </span>
              </button>
            </form>

            <div className="relative my-6 z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition text-sm font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition text-sm font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="text-center mt-6 relative z-10">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-red-600 hover:text-red-700 transition ml-1"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}