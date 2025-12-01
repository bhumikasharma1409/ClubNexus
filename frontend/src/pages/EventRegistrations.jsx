import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const EventRegistrations = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await fetch(`/api/events/${eventId}/registrations`);
                if (!res.ok) {
                    throw new Error('Failed to fetch registrations');
                }
                const data = await res.json();
                setRegistrations(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [eventId]);

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(registrations.map(reg => ({
            Name: reg.name,
            Year: reg.year,
            Branch: reg.department,
            'Roll No': reg.rollNo,
            'Phone Number': reg.phone,
            Email: reg.email,
            'Group Name': reg.groupName,
            Attendance: '' // Empty column for manual marking
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
        XLSX.writeFile(workbook, "Event_Registrations.xlsx");
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Event Registrations</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Back
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {registrations.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No registrations found for this event.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Year</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Branch</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Roll No</th>
                                        <th className="px-6 py-4 font-semibold text-gray-600">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {registrations.map((reg) => (
                                        <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-800">{reg.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{reg.year}</td>
                                            <td className="px-6 py-4 text-gray-600">{reg.department}</td>
                                            <td className="px-6 py-4 text-gray-600">{reg.rollNo}</td>
                                            <td className="px-6 py-4 text-gray-600">{reg.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventRegistrations;
