import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const MembersManagement = ({ clubId }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddTeam, setShowAddTeam] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamColor, setNewTeamColor] = useState('#EF4444');

    // Member Modal State
    const [showAddMember, setShowAddMember] = useState(false);
    const [activeTeamId, setActiveTeamId] = useState(null);
    const [newMember, setNewMember] = useState({ name: '', rollNo: '', phone: '' });

    useEffect(() => {
        if (clubId) fetchTeams();
    }, [clubId]);

    const fetchTeams = async () => {
        try {
            const res = await fetch(`/api/teams/${clubId}`);
            if (res.ok) {
                const data = await res.json();
                setTeams(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clubId, name: newTeamName, color: newTeamColor })
            });
            if (res.ok) {
                fetchTeams();
                setShowAddTeam(false);
                setNewTeamName('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/teams/${activeTeamId}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember)
            });
            if (res.ok) {
                fetchTeams();
                setShowAddMember(false);
                setNewMember({ name: '', rollNo: '', phone: '' });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteMember = async (teamId, memberId) => {
        if (!window.confirm('Remove this member?')) return;
        try {
            const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTeam = async (teamId) => {
        if (!window.confirm('Delete this team and all its members?')) return;
        try {
            const res = await fetch(`/api/teams/${teamId}`, {
                method: 'DELETE'
            });
            if (res.ok) fetchTeams();
        } catch (err) {
            console.error(err);
        }
    };

    const handleImport = async (e, teamId) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];

                // Read as array of arrays to handle various layouts
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

                if (!data || data.length === 0) {
                    alert('File is empty');
                    return;
                }

                let members = [];
                let headerRowIndex = -1;

                // 1. Try to find a header row containing "name"
                for (let i = 0; i < Math.min(data.length, 5); i++) {
                    const row = data[i].map(cell => String(cell).toLowerCase());
                    if (row.some(cell => cell.includes('name'))) {
                        headerRowIndex = i;
                        break;
                    }
                }

                if (headerRowIndex !== -1) {
                    // Header found, map columns
                    const headers = data[headerRowIndex].map(h => String(h).toLowerCase());
                    const nameIdx = headers.findIndex(h => h.includes('name'));
                    const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('mobile') || h.includes('contact'));
                    const rollIdx = headers.findIndex(h => h.includes('roll') || h.includes('id') || h.includes('reg'));
                    const posIdx = headers.findIndex(h => h.includes('position') || h.includes('role') || h.includes('designation'));

                    // Process rows after header
                    for (let i = headerRowIndex + 1; i < data.length; i++) {
                        const row = data[i];
                        if (!row || row.length === 0) continue;

                        const name = row[nameIdx];
                        if (name) {
                            members.push({
                                name: String(name).trim(),
                                phone: phoneIdx !== -1 ? String(row[phoneIdx] || '').trim() : '',
                                rollNo: rollIdx !== -1 ? String(row[rollIdx] || '').trim() : '',
                                position: posIdx !== -1 ? String(row[posIdx] || '').toLowerCase().trim() : 'member'
                            });
                        }
                    }
                } else {
                    // No header found, assume positional: Col 0 = Name, Col 1 = Phone/Roll, Col 2 = Position (optional)
                    // Heuristic: Skip rows that look like titles (only 1 column) or empty
                    for (let i = 0; i < data.length; i++) {
                        const row = data[i];
                        if (!row || row.length === 0) continue;

                        // Assume Col 0 is Name if it's a string and not a number
                        const col0 = row[0];
                        if (col0 && typeof col0 === 'string' && isNaN(Number(col0))) {
                            // Try to find a number in other columns for phone/roll
                            let phone = '';
                            let rollNo = '';
                            let position = 'member';

                            // Check Col 1 and Col 2
                            if (row[1]) {
                                const val = String(row[1]);
                                if (val.match(/\d{10}/)) phone = val; // Looks like phone
                                else if (val.toLowerCase().includes('head') || val.toLowerCase().includes('member')) position = val.toLowerCase();
                                else rollNo = val;
                            }
                            if (row[2]) {
                                const val = String(row[2]);
                                if (!phone && val.match(/\d{10}/)) phone = val;
                                else if (val.toLowerCase().includes('head') || val.toLowerCase().includes('member')) position = val.toLowerCase();
                                else if (!rollNo) rollNo = val;
                            }

                            members.push({
                                name: col0,
                                phone: phone,
                                rollNo: rollNo,
                                position: position
                            });
                        }
                    }
                }

                if (members.length === 0) {
                    alert('No valid members found in file. Please ensure the file has a "Name" column or follows "Name | Phone" format.');
                    return;
                }

                const res = await fetch(`/api/teams/${teamId}/members/bulk`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ members })
                });

                if (res.ok) {
                    alert(`Successfully imported ${members.length} members!`);
                    fetchTeams();
                } else {
                    alert('Failed to import members');
                }
            } catch (err) {
                console.error("Import Error:", err);
                alert('Error processing file');
            }
        };
        reader.readAsBinaryString(file);
        // Reset input
        e.target.value = '';
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
                <button
                    onClick={() => setShowAddTeam(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    + Create New Team
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {teams.map(team => (
                    <div key={team._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        {/* Header */}
                        <div
                            className="p-3 flex justify-between items-center"
                            style={{ backgroundColor: team.color }}
                        >
                            <h3 className="font-bold text-white uppercase tracking-wide text-sm">{team.name}</h3>
                            <div className="flex gap-2 items-center">
                                {/* Import Button */}
                                <label className="cursor-pointer p-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs flex items-center gap-1" title="Import from Excel/CSV">
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls, .csv"
                                        className="hidden"
                                        onChange={(e) => handleImport(e, team._id)}
                                    />
                                    <span>📥 Import</span>
                                </label>
                                <button
                                    onClick={() => { setActiveTeamId(team._id); setShowAddMember(true); }}
                                    className="p-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs"
                                    title="Add Member"
                                >
                                    + Add
                                </button>
                                <button
                                    onClick={() => handleDeleteTeam(team._id)}
                                    className="p-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs"
                                    title="Delete Team"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Members List */}
                        <div className="p-0 flex-1">
                            {team.members.length > 0 ? (
                                <table className="w-full text-sm">
                                    <tbody className="divide-y divide-gray-100">
                                        {team.members.map(member => (
                                            <tr
                                                key={member._id}
                                                className={`group hover:bg-gray-50 ${member.position?.toLowerCase().includes('head') ? 'bg-orange-50' : ''}`}
                                            >
                                                <td className="p-2 pl-4 font-medium text-gray-700">
                                                    {member.name}
                                                    {member.position?.toLowerCase().includes('head') && <span className="ml-2 text-xs bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded">HEAD</span>}
                                                </td>
                                                <td className="p-2 text-gray-500 text-right font-mono text-xs">{member.phone || member.rollNo}</td>
                                                <td className="p-2 pr-2 w-8 text-right">
                                                    <button
                                                        onClick={() => handleDeleteMember(team._id, member._id)}
                                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        &times;
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-sm italic">
                                    No members yet
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Team Modal */}
            {showAddTeam && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Create New Team</h3>
                        <form onSubmit={handleCreateTeam} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                    value={newTeamName}
                                    onChange={e => setNewTeamName(e.target.value)}
                                    placeholder="e.g. Core Team"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Header Color</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#111827'].map(color => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`w-8 h-8 rounded-full border-2 ${newTeamColor === color ? 'border-black scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setNewTeamColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddTeam(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Member Modal */}
            {showAddMember && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Add Member</h3>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                    value={newMember.name}
                                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                    value={newMember.phone}
                                    onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roll No (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                    value={newMember.rollNo}
                                    onChange={e => setNewMember({ ...newMember, rollNo: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddMember(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MembersManagement;
