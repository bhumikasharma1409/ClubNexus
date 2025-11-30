// src/pages/Register.jsx
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg";

/**
 * Register page — compact variant
 *
 * ParticlesBg is placed in a fixed full-screen container behind the gradient.
 * The gradient is placed above particles but behind the card so particles remain visible,
 * and the card stays on top.
 */

// Email regex to just check domain as per user request
const collegeEmailRegex = /@chitkara\.edu\.in$/;

const courses = [
  { value: "CSE", label: "Computer Science Engineering" },
  { value: "ECE", label: "Electronics & Communication" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "CE", label: "Civil Engineering" },
  { value: "EE", label: "Electrical Engineering" },
  { value: "IT", label: "Information Technology" },
  { value: "BBA", label: "Business Administration" },
  { value: "BCA", label: "Computer Applications" },
  { value: "MBA", label: "MBA" },
  { value: "MCA", label: "MCA" },
];

import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    batch: "",
    course: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleAccessToken: tokenResponse.access_token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to log in with Google");
        }

        login(data.user, data.token);
        navigate("/");
      } catch (err) {
        console.error(err);
        setError("Google Login Failed");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google Login Failed"),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
    setError("");
  };

  const passwordStrength = useMemo(() => {
    const p = form.password || "";
    if (p.length >= 10 && /[A-Z]/.test(p) && /\d/.test(p) && /[^A-Za-z0-9]/.test(p)) return "strong";
    if (p.length >= 7 && ((/[A-Z]/.test(p) && /\d/.test(p)) || (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)))) return "medium";
    if (p.length > 0) return "weak";
    return "";
  }, [form.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    const email = (form.email || "").trim().toLowerCase();
    if (!email) {
      setError("Please enter your college email.");
      setLoading(false);
      return;
    }
    if (!collegeEmailRegex.test(email)) {
      setError("Email must be a valid Chitkara University email (@chitkara.edu.in)");
      setLoading(false);
      return;
    }

    if (!form.password || form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (!form.year) {
      setError("Please select your year.");
      setLoading(false);
      return;
    }
    if (!form.batch.trim()) {
      setError("Please enter your batch (e.g., 2021-2025).");
      setLoading(false);
      return;
    }
    if (!form.course) {
      setError("Please select your course.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email,
          password: form.password,
          year: form.year,
          batch: form.batch.trim(),
          course: form.course
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Success
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1) Particles: BACK-most layer */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <ParticlesBg />
      </div>

      {/* 2) Gradient overlay: sits above particles but behind card */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-br from-red-50 via-white to-red-100 opacity-95" />
      </div>

      {/* 3) Main layout (card) sits above both */}
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <style>{`
          .card {
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 18px 50px -20px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.06);
          }

          /* left hero uses an image + dark overlay */
          .left-hero {
            background:
              linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
              url('/chitkara.webp');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .input {
            width: 100%;
            padding: 0.78rem 0.95rem;
            border-radius: 0.55rem;
            border: 1px solid rgba(16,24,40,0.06);
            background: white;
            font-size: 14px;
            outline: none;
            transition: box-shadow .16s ease, border-color .16s ease;
          }
          .input:focus { box-shadow: 0 8px 30px rgba(16,24,40,0.06); border-color: rgba(220,38,38,0.85); }
          .select { appearance: none; padding-right: 2.8rem; }
          .icon-box { width: 42px; height: 42px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.06); border-radius: 0.55rem; }
          .strength-dot { width: 8px; height: 8px; border-radius: 999px; display:inline-block; margin-right:6px; }
        `}</style>

        {/* narrower card */}
        <div className="w-full max-w-3xl card bg-white grid grid-cols-1 md:grid-cols-2">

          {/* LEFT HERO */}
          <div className="left-hero text-white p-6 md:p-8 flex flex-col justify-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome to</h1>
              <h2 className="text-4xl md:text-5xl font-extrabold mt-1">ClubNexus</h2>
            </div>

            <p className="mt-2 bg-white/10 p-3 rounded-lg max-w-[95%] text-sm">
              Join the community — discover clubs, sign up for events, and connect with other students.
            </p>
          </div>

          {/* RIGHT FORM (compact padding) */}
          <div className="p-6 md:p-8 bg-white relative">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Create Account</h3>

            {error && (
              <div className="mb-3 rounded-md bg-red-50 border border-red-100 p-2 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium block mb-1">Full Name</label>
                <input id="name" value={form.name} onChange={handleChange} className="input" placeholder="Your full name" />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium block mb-1">College Email</label>
                <input id="email" value={form.email} onChange={handleChange} className="input" placeholder="yourname0000.becse24@chitkara.edu.in" />
              </div>

              {/* YEAR + BATCH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1">Year</label>
                  <select id="year" value={form.year} onChange={handleChange} className="input">
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Batch</label>
                  <input id="batch" value={form.batch} onChange={handleChange} className="input" placeholder="2021-2025" />
                </div>
              </div>

              {/* COURSE */}
              <div>
                <label className="text-sm font-medium block mb-1">Course</label>
                <select id="course" value={form.course} onChange={handleChange} className="input">
                  <option value="">Select your course</option>
                  {courses.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium block mb-1">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="input pr-10"
                    placeholder="Create a password (min 6 chars)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {passwordStrength && (
                  <div className="mt-1 text-xs flex items-center gap-2">
                    <span className="flex items-center">
                      <span className="strength-dot" style={{ background: passwordStrength === "strong" ? "#059669" : passwordStrength === "medium" ? "#f59e0b" : "#ef4444" }}></span>
                      <span className="text-xs text-gray-700">
                        {passwordStrength === "strong" ? "Strong" : passwordStrength === "medium" ? "Medium" : "Weak"}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold text-base shadow hover:opacity-95 transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="relative my-4 z-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition text-sm font-semibold text-gray-700"
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
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 transition text-sm font-semibold text-gray-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                Already registered?{" "}
                <Link to="/login" className="text-red-600 font-semibold hover:underline">Login</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
