import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEventModal from '../components/AddEventModal';
import MembersTab from '../components/MembersTab';
import MembersManagement from '../components/MembersManagement';

const CodingNinjasDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
    console.log("Dashboard User:", user);

    const [activeTab, setActiveTab] = useState('dashboard');
    const [events, setEvents] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    // Fetch Club ID by name to ensure consistency with public page
    const [clubId, setClubId] = useState(null);

    useEffect(() => {
        const initializeDashboard = async () => {
            console.log("Initializing Dashboard...");
            try {
                // 1. Get Club ID by name
                const clubRes = await fetch('/api/clubs');
                console.log("Club Fetch Status:", clubRes.status);
                const clubs = await clubRes.json();
                console.log("Clubs Fetched:", clubs);
                const cnClub = clubs.find(c => c.name === 'Coding Ninjas');

                if (cnClub) {
                    console.log("Found Club ID:", cnClub._id);
                    setClubId(cnClub._id); // Store clubId in state
                    // 2. Fetch Events & Activity
                    await fetchEvents(cnClub._id);
                    await fetchRecentActivity(cnClub._id);
                    await fetchMemberCount(cnClub._id);
                } else {
                    console.error("Coding Ninjas club not found in database. Available clubs:", clubs.map(c => c.name));
                }
            } catch (err) {
                console.error("Failed to initialize dashboard", err);
            }
        };

        initializeDashboard();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchEvents = async (clubId) => {
        try {
            const res = await fetch(`/api/events/${clubId}`);
            const data = await res.json();
            if (res.ok) {
                setEvents(data);
            }
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
    };

    const fetchRecentActivity = async (clubId) => {
        try {
            const res = await fetch(`/api/activities/${clubId}`);
            const data = await res.json();
            if (res.ok) {
                setRecentActivity(data);
            }
        } catch (err) {
            console.error("Failed to fetch activity", err);
        }
    };

    const fetchMemberCount = async (clubId) => {
        try {
            const res = await fetch(`/api/teams/${clubId}`);
            const teams = await res.json();
            if (res.ok) {
                const count = teams.reduce((acc, team) => acc + team.members.length, 0);
                setTotalMembers(count);
            }
        } catch (err) {
            console.error("Failed to fetch member count", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin-login');
    };

    const handleEventAddedWrapper = (newEvent) => {
        if (eventToEdit) {
            setEvents(events.map(e => e._id === newEvent._id ? newEvent : e));
        } else {
            setEvents([...events, newEvent]);
        }
        if (clubId) fetchRecentActivity(clubId); // Re-fetch activity using the stored clubId
        setEventToEdit(null);
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setEvents(events.filter(e => e._id !== id));
                if (clubId) fetchRecentActivity(clubId); // Re-fetch activity using the stored clubId
            } else {
                alert('Failed to delete event');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditEvent = (event) => {
        setEventToEdit(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEventToEdit(null);
    };

    const renderContent = () => {
        if (activeTab === 'members') {
            return <MembersTab clubId={clubId} />;
        }
        if (activeTab === 'team') {
            return <MembersManagement clubId={clubId} />;
        }
        if (activeTab === 'settings') {
            return <div className="p-6 bg-white rounded-xl shadow-sm">Settings Placeholder</div>;
        }

        // Content for 'dashboard' and 'events' tabs
        return (
            <>
                {/* Stats Grid */}
                {(activeTab === 'dashboard') && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 font-medium">Total Events</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{events.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 font-medium">Active Members</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{totalMembers}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 font-medium">Pending Approvals</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">0</p>
                        </div>
                    </div>
                )}


                {/* Events Section */}
                {
                    (activeTab === 'dashboard' || activeTab === 'events') && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Upcoming Events</h3>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors text-sm"
                                >
                                    + Add Event
                                </button>
                            </div>

                            {events.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    No events found. Click "Add Event" to create one.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events.map((event) => (
                                        <div key={event._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                                            {event.poster && (
                                                <div className="h-48 overflow-hidden">
                                                    <img
                                                        src={event.poster}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4 flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-lg text-gray-800 line-clamp-1">{event.title}</h4>
                                                    <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded-full whitespace-nowrap">
                                                        {new Date(event.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                    <span className="flex items-center gap-1">
                                                        🕒 {event.time}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        📍 {event.place}
                                                    </span>
                                                </div>

                                                <div className="flex gap-2 mt-auto">
                                                    <button
                                                        onClick={() => navigate(`/admin/events/${event._id}/registrations`)}
                                                        className="flex-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                                                    >
                                                        View Registrations
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditEvent(event)}
                                                        className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteEvent(event._id)}
                                                        className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }


                {/* Recent Activity */}
                {
                    (activeTab === 'dashboard') && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivity.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No recent activity.</p>
                                ) : (
                                    recentActivity.map((activity) => (
                                        <div key={activity._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-800">{activity.action}</p>
                                                <p className="text-sm text-gray-500">{activity.details}</p>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {new Date(activity.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )
                }
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black shadow-md flex flex-col fixed h-full border-r border-gray-800">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-3">
                        <img src="/logo.png" alt="ClubNexus Logo" className="w-8 h-8 object-contain" />
                        <h1 className="text-2xl font-bold text-white">ClubNexus</h1>
                    </div>
                    <div className="flex items-center gap-2 pl-1">
                        <img src="/cn.jpg" alt="Coding Ninjas Logo" className="w-6 h-6 rounded-full object-cover border border-gray-600" />
                        <p className="text-sm text-gray-400 font-medium">Coding Ninjas Admin</p>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'members' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        Openings
                    </button>
                    <button
                        onClick={() => setActiveTab('team')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'team' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        Members
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'events' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}
                    >
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 ml-64">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Coding Ninjas Club</h2>
                        <p className="text-gray-600">Welcome back, {user.name || 'Admin'}!</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Only show Add Event button in dashboard view */}
                        {activeTab === 'dashboard' && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-xl shadow-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                                <span>+</span> Add Event
                            </button>
                        )}

                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold hover:bg-red-200 transition-colors focus:outline-none"
                            >
                                {user.name ? user.name[0] : 'A'}
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">{user.name || 'Admin'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email || 'admin@example.com'}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>

            {/* Modal */}
            {showModal && (
                <AddEventModal
                    onClose={handleCloseModal}
                    onEventAdded={handleEventAddedWrapper}
                    eventToEdit={eventToEdit}
                />
            )}
        </div>
    );
};

export default CodingNinjasDashboard;
