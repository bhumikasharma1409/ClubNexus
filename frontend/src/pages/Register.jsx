import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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

      // Registration successful, log them in
      login(data.user, data.token);
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-600">
          Create an Account
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input id="name" type="text" placeholder="Full Name" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500"/>
          <input id="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500"/>
          <input id="password" type="password" placeholder="Password (min 6 chars)" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500"/>
          
          <div className="grid grid-cols-2 gap-4">
            <select id="year" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500">
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <input id="batch" type="text" placeholder="Batch (e.g., 2021-2025)" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500"/>
          </div>
          
          <select id="course" onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-red-500">
            <option value="">Select Course</option>
            <option value="CSE">Computer Science Engineering</option>
            <option value="ECE">Electronics & Communication</option>
            <option value="ME">Mechanical Engineering</option>
            {/* Add other courses from your HTML */}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}