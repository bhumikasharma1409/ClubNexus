import React, { useState } from "react";
import AddEventModal from "../components/AddEventModal";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminEvents() {
  const [showModal, setShowModal] = useState(false);

  // Temporary frontend-only sample data
  const upcomingEvents = [
    {
      title: "Web Dev Bootcamp",
      date: "12 Dec",
      registrations: 87, 
      status: "Upcoming",
    },
  ];

  const pastEvents = [
    {
      title: "AI Seminar",
      date: "14 Feb",
      registrations: 95,
      status: "Completed",
    },
  ];

  return (
    <div className="flex">

      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64 p-8 w-full bg-white min-h-screen">
        {/* TOP HEADER */}
    <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900">
    Welcome, <span className="text-red-600">Open Source!</span>
    </h1>
    <p className="text-gray-600 mt-1">Manage your events, registrations, and members.</p>
    </div>

        {/* Add Event Button */}
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-500 
          text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
        >
          + Add New Event
        </button>

        {/* Modal */}
        {showModal && (
          <AddEventModal onClose={() => setShowModal(false)} />
        )}

        {/* Upcoming Events */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          Upcoming Events
        </h2>

        <EventTable events={upcomingEvents} />

        {/* Past Events */}
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">
          Past Events
        </h2>

        <EventTable events={pastEvents} />
      </div>
    </div>
  );
}



function EventTable({ events }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden mb-10">
      <table className="w-full text-left table-fixed">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-4 font-medium w-1/4">Event</th>
            <th className="p-4 font-medium w-1/6">Date</th>
            <th className="p-4 font-medium w-1/6">Registrations</th>
            <th className="p-4 font-medium w-1/6">Status</th>
            <th className="p-4 font-medium w-1/6">Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((ev, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-4 w-1/4">{ev.title}</td>
              <td className="p-4 w-1/6">{ev.date}</td>
              <td className="p-4 w-1/6">{ev.registrations}</td>

              <td className="p-4 w-1/6">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    ev.status === "Upcoming"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {ev.status}
                </span>
              </td>

              <td className="p-4 w-1/6 text-red-600 font-medium cursor-pointer">
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

