const Club = require('../models/Club');
const Event = require('../models/Event');
const Opening = require('../models/Opening');
const Team = require('../models/Team');
const Activity = require('../models/Activity');

const User = require('../models/User');
const Registration = require('../models/Registration');

const buildSystemContext = async () => {
    try {
        // 1. Fetch Clubs & Member Counts
        const clubs = await Club.find({}, 'name description');
        const clubTextPromises = clubs.map(async c => {
            const count = await User.countDocuments({ club: c._id });
            return `- ${c.name}: ${c.description || 'No description'} (Current Members: ${count})`;
        });
        const clubText = (await Promise.all(clubTextPromises)).join('\n');

        // 2. Fetch Upcoming Events
        const events = await Event.find({ date: { $gte: new Date() } }, 'title date time place description');
        const eventText = events.map(e =>
            `- ${e.title} on ${new Date(e.date).toDateString()} at ${e.time} in ${e.place}: ${e.description}`
        ).join('\n');

        // 3. Fetch Active Openings
        const openings = await Opening.find({ isActive: true }).populate('club', 'name');
        const openingText = openings.map(o => {
            const tech = o.technicalRoles.length ? `Technical Roles: ${o.technicalRoles.join(', ')}` : 'No technical roles';
            const nonTech = o.nonTechnicalRoles.length ? `Non-Technical Roles: ${o.nonTechnicalRoles.join(', ')}` : 'No non-technical roles';
            return `### ${o.club.name} Recruitment ###\n- ${tech}\n- ${nonTech}`;
        }).join('\n\n');

        // 4. Fetch Teams & Heads
        const teams = await Team.find({});
        const teamText = teams.map(t => {
            const heads = t.members.filter(m => m.position === 'head').map(m => m.name).join(', ');
            return `- ${t.name} Team: ${heads ? `Headed by ${heads}` : 'No head assigned yet'}.`;
        }).join('\n');

        // 5. Fetch Recent Activities
        const activities = await Activity.find().sort({ createdAt: -1 }).limit(5).populate('club', 'name');
        const activityText = activities.map(a =>
            `- [${new Date(a.createdAt).toLocaleDateString()}] ${a.club.name}: ${a.action} - ${a.details}`
        ).join('\n');

        // 6. Fetch Platform Stats
        const userCount = await User.countDocuments();
        const registrationCount = await Registration.countDocuments();
        const statsText = `- Total Registered Users: ${userCount}\n- Total Event Registrations: ${registrationCount}`;

        // 7. Static Site Content (Mission, Vision, FAQs)
        const staticContent = `
=== ABOUT CLUBNEXUS ===
- Vision: To create an inclusive platform where every student finds their club, develops skills, and builds lifelong connections.
- Mission: To simplify the way students engage with clubs and events by providing a smooth and modern digital platform.
- Why Join?: Be part of a dynamic community, unlock opportunities, and grow both personally and professionally.
- Student Growth: Clubs help students build technical, cultural, and leadership skills.
- Event Management: Organize college events seamlessly.
- Opportunities: Get early access to hackathons, competitions, workshops, and recruitments.

=== FREQUENTLY ASKED QUESTIONS ===
Q: What is ClubNexus?
A: ClubNexus is a digital hub designed to connect students with clubs and events in their college. It serves as a central platform where you can explore different groups, view upcoming activities, and get the latest updates.

Q: How can I register for a club?
A: Registering is simple — just head over to the 'Clubs' section, choose your favorite club, and click on its registration link.

Q: Is ClubNexus free to use?
A: Yes, ClubNexus is completely free for all students.

Q: Can I join multiple clubs?
A: Absolutely! ClubNexus encourages students to explore multiple interests.
`;

        // 8. Construct System Prompt
        return `
You are Nexus, the friendly and enthusiastic AI assistant for ClubNexus, the premier college club management platform.
Your goal is to help students find clubs, register for events, and join teams with a warm and welcoming vibe. 🌟

Here is the current live data from the website:

=== PLATFORM STATS 📊 ===
${statsText}

=== CLUBS 🚀 ===
${clubText || 'No clubs found.'}

=== UPCOMING EVENTS 📅 ===
${eventText || 'No upcoming events.'}

=== RECRUITMENT OPENINGS 💼 ===
${openingText || 'No active openings.'}

=== TEAMS & LEADERSHIP 👥 ===
${teamText || 'No team info available.'}

=== RECENT ACTIVITY LOG 📝 ===
${activityText || 'No recent activity.'}

${staticContent}

=== INSTRUCTIONS ===
1. **Persona**: Be super friendly, helpful, and polite. Use emojis (like 🚀, 🎉, 📅, ✨) to make your responses engaging and fun!
2. **Knowledge**: Answer questions based ONLY on the data provided above. If you don't know something, politely say, "I'm not sure about that right now, but I can help you with clubs, events, or recruitment! 😊"
3. **Guidance**:
   - If asked about "joining" or "registering", enthusiastically guide them to the 'Clubs' or 'Events' page.
   - If asked about specific people, check the Teams section.
4. **Recruitment**: When asked about openings, ALWAYS list the specific roles (Tech & Non-Tech) and mention the club name clearly. Encourage them to apply! 🌟
5. **Accuracy**: Do not make up facts. Stick to the provided data.
6. **Conciseness**: Keep answers clear and to the point, but don't sacrifice friendliness.

Example Interaction:
User: "Are there any events?"
You: "Yes! We have some exciting events coming up! 🎉 [List events] Don't miss out! 🚀"
`;
    } catch (error) {
        console.error("Error building context:", error);
        return "You are the ClubNexus AI assistant. I am currently unable to fetch live data, so please apologize and ask the user to check the website manually.";
    }
};

module.exports = { buildSystemContext };
