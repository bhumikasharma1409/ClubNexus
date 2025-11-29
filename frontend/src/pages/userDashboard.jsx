import React, { useEffect, useState } from 'react'

/**
 * UserDashboard.jsx
 *
 * Props:
 *  - user (optional): { name, email, role, bio, avatarInitials }
 *
 * If no `user` prop is provided, the component will try to fetch `/api/me`.
 * Replace fetch endpoints with your backend routes as needed.
 */

export default function UserDashboard({ user: userProp }) {
  const [user, setUser] = useState(userProp || null)
  const [loadingUser, setLoadingUser] = useState(!userProp)
  const [errorUser, setErrorUser] = useState(null)

  // Events arrays - replace with real API data or pass as props
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])

  // Helper to create initials from name
  const makeInitials = (name) => {
    if (!name) return ''
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
  }

  // If no user prop, fetch current user
  useEffect(() => {
    let mounted = true
    const fetchUser = async () => {
      if (userProp) return
      setLoadingUser(true)
      try {
        const res = await fetch('/api/me') // change to your endpoint
        if (!res.ok) throw new Error(`Failed to load user (${res.status})`)
        const data = await res.json()
        if (!mounted) return
        // normalize fields
        const normalized = {
          name: data.name || data.fullName || '',
          email: data.email || '',
          role: data.role || '',
          bio: data.bio || '',
          avatarInitials: data.avatarInitials || makeInitials(data.name || data.fullName || ''),
        }
        setUser(normalized)
        setErrorUser(null)
      } catch (err) {
        if (!mounted) return
        setErrorUser(err.message)
      } finally {
        if (!mounted) return
        setLoadingUser(false)
      }
    }
    fetchUser()
    return () => { mounted = false }
  }, [userProp])

  // Example: placeholder to fetch events (uncomment & adapt)
  // useEffect(() => {
  //   async function loadEvents() {
  //     const res = await fetch('/api/my-events') // adapt endpoint
  //     const payload = await res.json()
  //     setUpcomingEvents(payload.upcoming || [])
  //     setRegisteredEvents(payload.registered || [])
  //     setPastEvents(payload.past || [])
  //   }
  //   loadEvents()
  // }, [])

  // derived userData to avoid crashes
  const userData = user || { name: '', email: '', role: '', bio: '', avatarInitials: '' }
  const avatarInitials = userData.avatarInitials || makeInitials(userData.name)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome,&nbsp;
            <span className="text-indigo-600">{userData.name || 'Guest'}</span>
          </h1>
          <div className="text-sm text-gray-600">Manage your profile, registrations, and past participation</div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column - profile */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {loadingUser ? (
                <div className="animate-pulse">
                  <div className="h-16 w-16 rounded-full bg-gray-200" />
                  <div className="mt-3 h-4 w-32 bg-gray-200 rounded" />
                  <div className="mt-2 h-3 w-40 bg-gray-200 rounded" />
                </div>
              ) : errorUser ? (
                <div className="text-sm text-red-600">Error loading user: {errorUser}</div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                      {avatarInitials}
                    </div>
                    <div>
                      <div className="text-lg font-medium text-gray-800">{userData.name}</div>
                      <div className="text-sm text-gray-500">{userData.email}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">{userData.bio}</p>

                  <div className="mt-6 space-y-2">
                    <button className="w-full py-2 rounded-lg border border-indigo-100 text-indigo-600 font-medium">
                      Edit profile
                    </button>
                    <button className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium">
                      View full profile
                    </button>
                  </div>

                  <div className="mt-6 text-xs text-gray-500">
                    Role: <span className="text-gray-700">{userData.role}</span>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Right column - main content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Upcoming events */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
                <div className="text-sm text-gray-500">See what's next</div>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-sm text-gray-500">No upcoming events. Browse clubs to find events to join.</div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(ev => (
                    <div key={ev.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">{ev.date} • seats {ev.seats}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`text-sm px-3 py-1 rounded-full text-white ${ev.status === 'Registered' ? 'bg-emerald-500' : 'bg-gray-400'}`}>
                          {ev.status}
                        </div>
                        <button className="text-sm text-indigo-600 font-medium">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Registered Events */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Registered Events</h2>
                <div className="text-sm text-gray-500">Manage registrations</div>
              </div>

              {registeredEvents.length === 0 ? (
                <div className="text-sm text-gray-500">You haven't registered for any events yet.</div>
              ) : (
                <div className="divide-y">
                  {registeredEvents.map(ev => (
                    <div key={ev.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">{ev.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-sm px-3 py-1 rounded-md border">Cancel</button>
                        <button className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Past Events */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Past Events</h2>
                <div className="text-sm text-gray-500">Your participation history</div>
              </div>

              {pastEvents.length === 0 ? (
                <div className="text-sm text-gray-500">No past events</div>
              ) : (
                <div className="space-y-3">
                  {pastEvents.map(ev => (
                    <div key={ev.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">{ev.date} • {ev.role}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-sm px-3 py-1 rounded-md border">Certificate</button>
                        <button className="text-sm text-indigo-600 font-medium">Feedback</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
