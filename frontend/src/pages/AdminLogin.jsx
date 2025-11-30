import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks

    setError("");
    setLoading(true);

    try {
      if (step === 1) {
        // Step 1: Send credentials
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Login failed");
          return;
        }

        if (data.requireOtp) {
          setStep(2); // Move to OTP step
          alert(`OTP sent to ${data.email}`);
        } else {
          // Normal login (if not admin or no OTP required)
          localStorage.setItem("adminToken", data.token);
          navigate("/admin/dashboard");
        }
      } else {
        // Step 2: Verify OTP
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Invalid OTP");
          return;
        }

        // Success
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
      <style>{`
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

        {/* LEFT SIDE */}
        <div className="left-hero text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold">Welcome Admin</h1>
          <h2 className="text-5xl font-extrabold mt-2">ClubNexus</h2>
          <p className="mt-4 text-sm bg-white/20 p-4 rounded-lg backdrop-blur-md">
            Manage your club, verify events, and access admin dashboard.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-6">
            {step === 1 ? "Admin Login" : "Enter OTP"}
          </h2>

          {error && (
            <p className="mb-4 text-red-600 font-medium bg-red-100 p-2 rounded-lg">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {step === 1 ? (
              <>
                {/* EMAIL */}
                <div>
                  <label className="font-medium">Admin Email</label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-3 mt-1"
                    placeholder="admin@college.edu"
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
              </>
            ) : (
              /* OTP INPUT */
              <div>
                <label className="font-medium">One-Time Password</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-3 mt-1 text-center text-2xl tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Check your email for the code.
                </p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-black text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Processing..." : (step === 1 ? "Login as Admin" : "Verify OTP")}
            </button>
          </form>

          {/* USER LOGIN LINK */}
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
