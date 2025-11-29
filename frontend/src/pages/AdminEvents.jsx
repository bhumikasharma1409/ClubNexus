import React, { useState, useEffect } from "react";
import AddEventModal from "../components/AddEventModal";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminEvents() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("adminToken");

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error loading events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Split events
  const upcomingEvents = events.filter((e) => !e.isPublished);
  const pastEvents = events.filter((e) => e.isPublished);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 p-8 w-full bg-white min-h-screen">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Admin!
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your events, registrations, and members.
        </p>

        {/* ADD EVENT BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-500 
          text-white font-semibold rounded-xl shadow-lg hover:opacity-90 mt-6"
        >
          + Add New Event
        </button>

        {/* MODAL */}
        {showModal && (
          <AddEventModal onClose={() => {
            setShowModal(false);
            fetchEvents();
          }} />
        )}

        {/* UPCOMING EVENTS */}
        <h2 className="text-2xl font-bold mt-10">Upcoming Events</h2>
        <EventTable events={upcomingEvents} refresh={fetchEvents} />

        {/* PAST EVENTS */}
        <h2 className="text-2xl font-bold mt-10">Completed Events</h2>
        <EventTable events={pastEvents} refresh={fetchEvents} />
      </div>
    </div>
  );
}

function EventTable({ events, refresh }) {
  const token = localStorage.getItem("adminToken");

  // DELETE EVENT
  const deleteEvent = async (id) => {
    await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    refresh();
  };

  // PUBLISH EVENT
  const publishEvent = async (id) => {
    await fetch(`/api/events/${id}/publish`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border mt-4 overflow-hidden">
      <table className="w-full text-left table-fixed">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4">Event</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((ev, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">{ev.title}</td>
              <td className="p-4">{ev.date?.slice(0, 10)}</td>
              <td className="p-4">
                {ev.isPublished ? (
                  <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full">
                    Published
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full">
                    Draft
                  </span>
                )}
              </td>

              <td className="p-4 flex gap-4">
                {!ev.isPublished && (
                  <button
                    onClick={() => publishEvent(ev._id)}
                    className="text-blue-600"
                  >
                    Publish
                  </button>
                )}

                <button
                  onClick={() => deleteEvent(ev._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
