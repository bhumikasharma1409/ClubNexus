import React from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome, manage everything here.</p>

        <div className="mt-8 flex gap-6">
          <Link to="/admin-events">
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl">
              Manage Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
