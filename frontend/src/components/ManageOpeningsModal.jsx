import React, { useState, useEffect } from 'react';

const TECHNICAL_ROLES = [
    "ML OPS", "App Development", "Web Development", "Cyber Security",
    "Open Source", "Programming & DSA"
];

const NON_TECHNICAL_ROLES = [
    "Content", "Graphics", "Organizing", "Discipline",
    "Outreach", "Promotions", "Social Media & Editing"
];

const ManageOpeningsModal = ({ onClose, clubId, initialData }) => {
    const [activeTab, setActiveTab] = useState('technical');
    const [selectedTech, setSelectedTech] = useState([]);
    const [selectedNonTech, setSelectedNonTech] = useState([]);
    const [poster, setPoster] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            // Filter out roles that are no longer in the allowed lists
            const validTech = (initialData.technicalRoles || []).filter(r => TECHNICAL_ROLES.includes(r));
            const validNonTech = (initialData.nonTechnicalRoles || []).filter(r => NON_TECHNICAL_ROLES.includes(r));

            setSelectedTech(validTech);
            setSelectedNonTech(validNonTech);
            if (initialData.poster) {
                setPreview(initialData.poster);
            }
        }
    }, [initialData]);

    const handleCheckboxChange = (role, type) => {
        if (type === 'technical') {
            setSelectedTech(prev =>
                prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
            );
        } else {
            setSelectedNonTech(prev =>
                prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
            );
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPoster(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('clubId', clubId);
        formData.append('technicalRoles', JSON.stringify(selectedTech));
        formData.append('nonTechnicalRoles', JSON.stringify(selectedNonTech));
        if (poster) {
            formData.append('poster', poster);
        }

        try {
            const res = await fetch('/api/openings', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                alert('Openings updated successfully!');
                onClose();
            } else {
                const errorData = await res.json();
                alert(`Failed to update openings: ${errorData.message || res.statusText}`);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center bg-red-50 rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-red-600">Manage Recruitment Openings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Tabs */}
                    <div className="flex space-x-4 border-b">
                        <button
                            type="button"
                            className={`pb-2 px-4 font-semibold ${activeTab === 'technical' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('technical')}
                        >
                            Technical Roles
                        </button>
                        <button
                            type="button"
                            className={`pb-2 px-4 font-semibold ${activeTab === 'non-technical' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('non-technical')}
                        >
                            Non-Technical Roles
                        </button>
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 gap-4">
                        {activeTab === 'technical' ? (
                            TECHNICAL_ROLES.map(role => (
                                <label key={role} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                    <input
                                        type="checkbox"
                                        checked={selectedTech.includes(role)}
                                        onChange={() => handleCheckboxChange(role, 'technical')}
                                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                                    />
                                    <span className="text-gray-700">{role}</span>
                                </label>
                            ))
                        ) : (
                            NON_TECHNICAL_ROLES.map(role => (
                                <label key={role} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                                    <input
                                        type="checkbox"
                                        checked={selectedNonTech.includes(role)}
                                        onChange={() => handleCheckboxChange(role, 'non-technical')}
                                        className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                                    />
                                    <span className="text-gray-700">{role}</span>
                                </label>
                            ))
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Recruitment Poster</label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-gray-400 text-xs">No Image</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageOpeningsModal;
