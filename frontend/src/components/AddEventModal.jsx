import React, { useState } from "react";

export default function AddEventModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // On input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit to backend
  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.description) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Failed to add event.");
        setLoading(false);
        return;
      }

      setLoading(false);
      onClose(); // close modal + refresh events from parent

    } catch (err) {
      console.error(err);
      setError("Server error, try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Add New Event
        </h2>

        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Title */}
        <input
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
          value={form.title}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Date */}
        <input
          name="date"
          type="date"
          onChange={handleChange}
          value={form.date}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Event Description"
          onChange={handleChange}
          value={form.description}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 h-24
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 text-white rounded-xl shadow-lg 
              bg-gradient-to-r from-red-700 to-red-500 hover:opacity-90
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`
            }
          >
            {loading ? "Adding..." : "Submit"}
          </button>

        </div>

      </div>
    </div>
  );
}
