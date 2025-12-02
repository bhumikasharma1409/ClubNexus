import React, { useState, useEffect } from 'react';
import ManageOpeningsModal from './ManageOpeningsModal';
import * as XLSX from 'xlsx';

const MembersTab = ({ clubId }) => {
    const [showModal, setShowModal] = useState(false);
    const [openingData, setOpeningData] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOpeningData = async () => {
        try {
            const res = await fetch(`/api/openings/${clubId}`);
            if (res.ok) {
                const data = await res.json();
                setOpeningData(data);
            }
        } catch (err) {
            console.error("Failed to fetch opening data", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        try {
            const res = await fetch(`/api/applications/${clubId}`);
            if (res.ok) {
                const data = await res.json();
                setApplications(data);
            }
        } catch (err) {
            console.error("Failed to fetch applications", err);
        }
    };

    useEffect(() => {
        if (clubId) {
            fetchOpeningData();
            fetchApplications();
        }
    }, [clubId]);

    const handleModalClose = () => {
        setShowModal(false);
        fetchOpeningData(); // Refresh data after close
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(applications.map(app => ({
            Name: app.name,
            'Roll No': app.rollNo,
            Year: app.year,
            'Contact Number': app.contactNumber,
            Position: app.position,
            'Applied At': new Date(app.createdAt).toLocaleDateString()
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
        XLSX.writeFile(workbook, "Club_Applicants.xlsx");
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Members & Recruitment</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition-colors"
                >
                    Manage Openings
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Current Recruitment Status</h3>

                {(!openingData || (!openingData.technicalRoles?.length && !openingData.nonTechnicalRoles?.length)) ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 mb-2">No active recruitment openings.</p>
                        <p className="text-sm text-gray-400">Click "Manage Openings" to start recruiting.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Roles List */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                    Technical Roles
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {openingData.technicalRoles?.length > 0 ? (
                                        openingData.technicalRoles.map(role => (
                                            <span key={role} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">None selected</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    Non-Technical Roles
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {openingData.nonTechnicalRoles?.length > 0 ? (
                                        openingData.nonTechnicalRoles.map(role => (
                                            <span key={role} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">None selected</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Poster Preview */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3">Recruitment Poster</h4>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                {openingData.poster ? (
                                    <img
                                        src={openingData.poster}
                                        alt="Recruitment Poster"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No poster uploaded
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Applicants Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Applicants</h3>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                        disabled={applications.length === 0}
                    >
                        <span>Export to Excel</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Roll No</th>
                                <th className="py-3 px-4">Year</th>
                                <th className="py-3 px-4">Phone Number</th>
                                <th className="py-3 px-4">Position</th>
                                <th className="py-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {applications.length === 0 ? (
                                <tr><td colSpan="6" className="py-4 text-center text-gray-500">No applications received yet</td></tr>
                            ) : (
                                applications.map(app => (
                                    <tr key={app._id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{app.name}</td>
                                        <td className="py-3 px-4">{app.rollNo}</td>
                                        <td className="py-3 px-4">{app.year}</td>
                                        <td className="py-3 px-4">{app.contactNumber}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-100">
                                                {app.position}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <ManageOpeningsModal
                    onClose={handleModalClose}
                    clubId={clubId}
                    initialData={openingData}
                />
            )}
        </div>
    );
};

export default MembersTab;
