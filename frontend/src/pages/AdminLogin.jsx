import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!collegeEmailRegex.test(email)) {
      setError("Invalid college admin email format.");
      return;
    }

    if (!club) {
      setError("Please select your club.");
      return;
    }

    // Validate password for selected club
    const selectedClub = clubs.find((c) => c.name === club);
    if (!selectedClub || selectedClub.password !== password) {
      setError("Incorrect admin password.");
      return;
    }

    setError("");

    // SUCCESS → redirect
    alert("Admin Login Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
      <style>{`
        /* Left hero uses chitkara.webp with a black transparent overlay.
           Place chitkara.webp in /public (url('/chitkara.webp')) or adjust path. */
        .left-hero {
          background:
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
            url('/chitkara.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE (image + overlay) */}
        <div className="left-hero text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold">Welcome Admin</h1>
          <h2 className="text-5xl font-extrabold mt-2">ClubNexus</h2>
          <p className="mt-4 text-sm bg-white/20 p-4 rounded-lg backdrop-blur-md">
            Manage your club, verify events, and access admin dashboard.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">Admin Login</h2>

          {error && (
            <p className="mb-4 text-red-600 font-medium bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div>
              <label className="font-medium">Admin Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="admin@codingclub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold text-lg shadow-lg hover:opacity-90"
            >
              Login as Admin
            </button>
          </form>

          {/* USER LOGIN */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">Not an admin?</p>
            <Link
              to="/login"
              className="text-red-600 font-semibold hover:underline"
            >
              Login as User →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
