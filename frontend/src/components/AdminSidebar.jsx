import { NavLink } from "react-router-dom";
import { FiCalendar, FiUsers, FiList, FiGrid } from "react-icons/fi";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r shadow-lg fixed left-0 top-0 p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg font-medium
            ${isActive ? "bg-red-100 text-red-700" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <FiGrid /> Dashboard
        </NavLink>

        <NavLink
          to="/admin-events"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg font-medium
            ${isActive ? "bg-red-100 text-red-700" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <FiCalendar /> Events
        </NavLink>

        <NavLink
          to="/admin-registrations"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg font-medium
            ${isActive ? "bg-red-100 text-red-700" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <FiList /> Registrations
        </NavLink>

        <NavLink
          to="/admin-members"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg font-medium
            ${isActive ? "bg-red-100 text-red-700" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <FiUsers /> Members
        </NavLink>

      </nav>
    </div>
  );
}
