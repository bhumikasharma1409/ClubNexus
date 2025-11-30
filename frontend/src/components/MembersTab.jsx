import React, { useState, useEffect } from 'react';
import ManageOpeningsModal from './ManageOpeningsModal';

const MembersTab = ({ clubId }) => {
    const [showModal, setShowModal] = useState(false);
    const [openingData, setOpeningData] = useState(null);
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

    useEffect(() => {
        if (clubId) fetchOpeningData();
    }, [clubId]);

    const handleModalClose = () => {
        setShowModal(false);
        fetchOpeningData(); // Refresh data after close
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
