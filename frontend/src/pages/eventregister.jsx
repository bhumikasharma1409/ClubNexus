import React, { useState } from "react";

export default function EventRegisterForm() {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    department: "",
    year: "",
    email: "",
    phone: "",
    group: "",
  });
  const [errors, setErrors] = useState({});
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const departments = ["CSE", "ECE", "ME", "Civil", "IT", "Other"];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\d{10,12}$/.test(form.roll)) err.roll = "Enter a valid roll no (10-12 digits)";
    if (!form.department) err.department = "Select department";
    if (!form.year) err.year = "Select year";
    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) err.email = "Invalid email";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Enter a valid 10-digit phone starting with 6-9";
    if (!form.group.trim()) err.group = "Group is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // submit logic here (API call, context update etc.)
    // For now just print to console
    console.log("Registered:", form);
    alert("Registration submitted — check console (or replace with API call)");
    setForm({ name: "", roll: "", department: "", year: "", email: "", phone: "", group: "" });
    setErrors({});
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav matching the provided red/black gradient theme */}
      

      <main className="max-w-4xl mx-auto p-6">
        <section className="mt-8 bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-red-600 via-red-800 to-blackfont-semibold mb-1 text-red-800">Event Registration</h2>
          <p className="mb-6 text-sm text-gray-500">Fill in the details below to register for the event.</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Full name"
                required
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Roll No */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Roll No</label>
              <input
                name="roll"
                value={form.roll}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.roll ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="e.g. 2410990202"
                inputMode="numeric"
                required
              />
              {errors.roll && <p className="text-xs text-red-600 mt-1">{errors.roll}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.department ? 'border-red-400' : 'border-gray-200'}`}
                required
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && <p className="text-xs text-red-600 mt-1">{errors.department}</p>}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.year ? 'border-red-400' : 'border-gray-200'}`}
                required
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-xs text-red-600 mt-1">{errors.year}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="your@chitkara.edu.in"
                type="email"
                required
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="10-digit mobile"
                inputMode="tel"
                required
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Group */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Group</label>
              <input
                name="group"
                value={form.group}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.group ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Group"
                required
              />
              {errors.group && <p className="text-xs text-red-600 mt-1">{errors.group}</p>}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex items-center justify-end space-x-4 mt-2">
              <button
                type="reset"
                onClick={() => {
                  setForm({ name: "", roll: "", department: "", year: "", email: "", phone: "", group: "" });
                  setErrors({});
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 font-medium"
              >
                Reset
              </button>
              <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 via-red-800 to-black hover:bg-red-700 text-white font-semibold">
                Register
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
