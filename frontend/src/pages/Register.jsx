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

const collegeEmailRegex = /^[a-z]+[0-9]{4}\.[a-z]+[0-9]{2}@chitkara\.edu\.in$/;

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

function getStoredUsers() {
  try {
    const raw = localStorage.getItem("clubnexus_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveUser(user) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem("clubnexus_users", JSON.stringify(users));
}

export default function Register() {
  const navigate = useNavigate();

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

  const users = useMemo(() => getStoredUsers(), []);

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

  const handleSubmit = (e) => {
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
      setError("Invalid college email format. Example: name0000.course24(year)@chitkara.edu.in");
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

    const exists = users.find((u) => u.email.toLowerCase() === email);
    if (exists) {
      setError("An account with this email already exists. Please login.");
      setLoading(false);
      return;
    }

    try {
      saveUser({
        name: form.name.trim(),
        email,
        password: form.password,
        year: form.year,
        batch: form.batch.trim(),
        course: form.course,
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to save your account. Try again.");
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
