import React, { useState } from "react";
import { Link } from "react-router-dom";

const clubs = [
  { id: "t1", name: "Coding Ninja", password: "Bhumika@1234" },
  { id: "t2", name: "ACM", password: "ACM@1234" },
  { id: "t3", name: "IEEE", password: "IEEE@1234" },
  { id: "t4", name: "GFG", password: "GFG@1234" },
  { id: "t5", name: "Open Source", password: "OS@1234" },
  { id: "t6", name: "Bits n Byte", password: "BNB@1234" },
  { id: "t7", name: "GDSC", password: "GDSC@1234" },
  { id: "t8", name: "Coding Blocks", password: "CB@1234" },
  { id: "t9", name: "OSA", password: "OSA@1234" }
];

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email Validation (Chitkara Admin Email Pattern)
  const collegeEmailRegex =
    /^[a-z]+[0-9]{4}\.[a-z]+[0-9]{2}@chitkara\.edu\.in$/;

  const handleSubmit = (e) => {
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
    if (selectedClub.password !== password) {
      setError("Incorrect admin password.");
      return;
    }

    setError("");

    // SUCCESS → redirect
    alert("Admin Login Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-b from-red-600 to-black text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold">Welcome Admin</h1>
          <h2 className="text-5xl font-extrabold mt-2">ClubNexus</h2>
          <p className="mt-4 text-sm bg-white/20 p-4 rounded-lg backdrop-blur-md">
            Manage your club, verify events, and access admin dashboard.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">Admin Login</h2>

          {error && (
            <p className="mb-4 text-red-600 font-medium bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-medium">College Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="yourname0000.becse24@chitkara.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* CLUB SELECT */}
            <div>
              <label className="font-medium">You are admin of</label>
              <select
                className="w-full border rounded-lg p-3 mt-1"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                required
              >
                <option value="">Select Club</option>
                {clubs.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium">Admin Password</label>
              <input
                type="password"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold text-lg shadow-lg hover:opacity-90"
            >
              Login as Admin
            </button>
          </form>

          {/* USER LOGIN BELOW */}
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
