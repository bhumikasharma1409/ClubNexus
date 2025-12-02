import React, { useState, useEffect } from 'react';

export default function ContactFormModal({ isOpen, onClose, user }) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        rollNo: user?.batch || '', // Assuming batch might be roll no, or empty
        contactNumber: '',
        feedback: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    name: user.name || '',
                    email: user.email || '',
                    rollNo: user.batch || ''
                }));
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                alert('Message sent successfully!');
                onClose();
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    rollNo: user?.batch || '',
                    contactNumber: '',
                    feedback: ''
                });
            } else {
                alert(data.message || 'Failed to send message');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col relative animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white flex-shrink-0 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <p className="text-red-100 text-sm mt-1">We'd love to hear from you!</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Scrollable Form Container */}
                <div className="overflow-y-auto p-6 custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                readOnly={!!user?.email}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900 ${user?.email ? 'bg-gray-100' : ''}`}
                                placeholder="you@chitkara.edu.in"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Roll No.</label>
                            <input
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900"
                                placeholder="e.g. 2410990202"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900"
                                placeholder="10 digit phone"
                                pattern="[0-9]{10}"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback / Message</label>
                            <textarea
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition text-gray-900 resize-none"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg hover:shadow-red-500/30 transition transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Submit'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
