import React, { useState } from 'react';

const ApplicationFormModal = ({ onClose, clubId, roles = [], user }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        rollNo: '',
        email: user?.email || '',
        year: '',
        contactNumber: '',
        position: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/applications/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    clubId,
                    ...formData,
                    clubId
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert('Application submitted successfully!');
                onClose();
            } else {
                alert(data.message || 'Failed to submit application');
            }
        } catch (err) {
            console.error('Submission error:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                <div className="bg-gradient-to-r from-red-900 to-black p-6 border-b border-gray-800">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-white">Join the Team</h3>
                        <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-red-100 mt-2">Please fill out the form below to apply.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Position Applying For</label>
                        <select
                            name="position"
                            required
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                        >
                            <option value="" className="bg-gray-800">Select a Position</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role} className="bg-gray-800">{role}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Roll Number</label>
                        <input
                            type="text"
                            name="rollNo"
                            required
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-500"
                            placeholder="e.g. 211099xxxx"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                            <select
                                name="year"
                                required
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                            >
                                <option value="" className="bg-gray-800">Select Year</option>
                                <option value="1" className="bg-gray-800">1st Year</option>
                                <option value="2" className="bg-gray-800">2nd Year</option>
                                <option value="3" className="bg-gray-800">3rd Year</option>
                                <option value="4" className="bg-gray-800">4th Year</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                required
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-500"
                                placeholder="10-digit number"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30"
                        >
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationFormModal;
