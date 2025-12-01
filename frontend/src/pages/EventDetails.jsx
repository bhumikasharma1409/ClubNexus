import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [dlStatus, setDlStatus] = useState(null); // null, 'Pending', 'Approved', 'Rejected'

    // Duty Leave Form State
    const [formData, setFormData] = useState({
        studentName: '',
        rollNo: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await fetch(`/api/events/details/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setEvent(data);
                } else {
                    console.error('Failed to fetch event details');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    useEffect(() => {
        if (user) {
            setFormData({
                studentName: user.name || '',
                rollNo: user.rollNo || '', // Assuming rollNo might be in user object
            });
        }
    }, [user]);

    // Check DL Status
    useEffect(() => {
        const checkDlStatus = async () => {
            console.log("Checking DL Status. User:", user, "Event:", event);
            if (user && event) {
                try {
                    const url = `/api/duty-leaves/status?userId=${user._id || user.id}&eventId=${event._id}`;
                    console.log("Fetching status from:", url);
                    const res = await fetch(url);
                    if (res.ok) {
                        const data = await res.json();
                        console.log("Status received:", data.status);
                        setDlStatus(data.status);
                    } else {
                        console.error("Status check failed:", res.status);
                    }
                } catch (err) {
                    console.error("Failed to check DL status", err);
                }
            }
        };
        checkDlStatus();
    }, [user, event]);

    const handleApplyDutyLeave = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/duty-leaves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    eventName: event.title,
                    date: event.date,
                    clubId: event.club._id || event.club,
                    userId: user._id || user.id,
                    eventId: event._id
                }),
            });

            if (res.ok) {
                alert('Duty Leave application submitted successfully!');
                setDlStatus('Pending');
                setShowModal(false);
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!event) return <div className="min-h-screen flex items-center justify-center">Event not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-serif">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4 md:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                    {/* Left Column: Details */}
                    <div className="p-8 md:w-1/2 flex flex-col justify-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>

                        <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📅</span>
                                <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🕒</span>
                                <span className="font-medium">{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📍</span>
                                <span className="font-medium">{event.place}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-700 mb-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">About the Event</h3>
                            <p className="whitespace-pre-line leading-relaxed">{event.description}</p>
                        </div>

                        <div className="flex gap-4 items-center">
                            {dlStatus ? (
                                <div className={`px-8 py-3 rounded-xl font-bold shadow-sm border ${dlStatus === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                                    dlStatus === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                        'bg-yellow-100 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {dlStatus === 'Approved' ? '✅ DL Approved' :
                                        dlStatus === 'Rejected' ? '❌ DL Rejected' :
                                            '⏳ DL Applied'}
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1"
                                >
                                    Apply for Duty Leave
                                </button>
                            )}
                            <Link
                                to="/dashboard"
                                className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Poster */}
                    {event.poster && (
                        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-4">
                            <img
                                src={event.poster}
                                alt={event.title}
                                className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            {/* Duty Leave Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for Duty Leave</h2>
                        <p className="text-gray-600 mb-6 text-sm">
                            Please confirm your details to apply for duty leave for <strong>{event.title}</strong>.
                        </p>

                        <form onSubmit={handleApplyDutyLeave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.rollNo}
                                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                                    placeholder="e.g. 201099xxxx"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
