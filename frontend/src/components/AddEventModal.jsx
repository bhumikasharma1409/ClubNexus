import React, { useState } from "react";

export default function AddEventModal({ onClose }) {

  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    status: "upcoming",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Add New Event
        </h2>

        <input
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <input
          name="date"
          type="date"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <textarea
          name="description"
          placeholder="Event Description"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3 h-24
          focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <select
          name="status"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl mb-3
          focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-500 
            text-white rounded-xl shadow-lg hover:opacity-90"
          >
            Submit
          </button>

        </div>

      </div>
    </div>
  );
}
