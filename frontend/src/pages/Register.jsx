// src/pages/Register.jsx
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg";

/**
 * Register page — improved UI
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
      <ParticlesBg />
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-red-50 via-white to-red-100">
        <style>{`
          .card {
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 18px 50px -20px rgba(0,0,0,0.4), 0 8px 30px rgba(0,0,0,0.06);
          }

          /* UPDATED LEFT HERO WITH IMAGE + BLACK OVERLAY */
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
            padding: 0.9rem 1rem;
            border-radius: 0.6rem;
            border: 1px solid rgba(16,24,40,0.06);
            background: white;
            font-size: 15px;
            outline: none;
            transition: box-shadow .18s ease, border-color .18s ease;
          }
          .input:focus { box-shadow: 0 8px 30px rgba(16,24,40,0.06); border-color: rgba(220,38,38,0.85); }
          .select {
            appearance: none;
            padding-right: 3rem;
            background-image: linear-gradient(45deg, transparent 50%, transparent 50%),
                              linear-gradient(135deg, transparent 50%, transparent 50%),
                              linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.02));
            background-position: calc(100% - 1.1rem) center, calc(100% - 0.85rem) center, right center;
            background-size: 8px 8px, 8px 8px, 1px 1.2rem;
            background-repeat: no-repeat;
          }
          .icon-box {
            width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,0.06); border-radius: 0.6rem;
          }
          .strength-dot { width: 8px; height: 8px; border-radius: 999px; display:inline-block; margin-right:6px; }
        `}</style>

        <div className="w-full max-w-6xl card bg-white grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT HERO SECTION WITH IMAGE */}
          <div className="left-hero text-white p-10 md:p-12 flex flex-col justify-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Welcome to</h1>
              <h2 className="text-5xl md:text-6xl font-extrabold mt-1">ClubNexus</h2>
            </div>

            <p className="mt-2 bg-white/12 p-4 rounded-lg max-w-[95%]">
              Join the community — discover clubs, sign up for events, and connect with other students.
            </p>

            <div className="mt-6">
              <ul className="text-sm space-y-2">
                <li>• Use your official college email</li>
              </ul>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="p-8 md:p-12 bg-white relative">
            <h3 className="text-2xl font-bold mb-4">Create Account</h3>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 border border-red-100 p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* NAME */}
              <div>
                <label className="text-sm font-medium block mb-2">Full Name</label>
                <div className="flex gap-3 items-center">
                  <div className="icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 21a8 8 0 10-18 0" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input id="name" value={form.name} onChange={handleChange} className="input" placeholder="Your full name" />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium block mb-2">College Email</label>
                <div className="flex gap-3 items-center">
                  <div className="icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 8l9 6 9-6" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25"/>
                    </svg>
                  </div>
                  <input id="email" value={form.email} onChange={handleChange} className="input" placeholder="yourname0000.becse24@chitkara.edu.in" />
                </div>
              </div>

              {/* YEAR + BATCH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Year</label>
                  <select id="year" value={form.year} onChange={handleChange} className="input select">
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Batch</label>
                  <input id="batch" value={form.batch} onChange={handleChange} className="input" placeholder="2021-2025" />
                </div>
              </div>

              {/* COURSE */}
              <div>
                <label className="text-sm font-medium block mb-2">Course</label>
                <select id="course" value={form.course} onChange={handleChange} className="input select">
                  <option value="">Select your course</option>
                  {courses.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium block mb-2">Password</label>
                <div className="flex items-center gap-3">
                  <div className="icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="10" rx="2" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25"/>
                      <path d="M7 11V8a5 5 0 0110 0v3" stroke="rgba(0,0,0,0.5)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="relative flex-1">
                    <input
                      id="password"
                      value={form.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      className="input pr-12"
                      placeholder="Create a password (min 6 chars)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029" stroke="currentColor" strokeWidth="1.25"/></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.25"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                {passwordStrength && (
                  <div className="mt-2 text-sm flex items-center gap-3">
                    <span className="flex items-center">
                      <span className="strength-dot" style={{ background: passwordStrength === "strong" ? "#059669" : passwordStrength === "medium" ? "#f59e0b" : "#ef4444" }}></span>
                      <span className="text-xs font-medium text-gray-700">
                        {passwordStrength === "strong" ? "Strong" : passwordStrength === "medium" ? "Medium" : "Weak"}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold text-lg shadow hover:opacity-95 transition"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
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
