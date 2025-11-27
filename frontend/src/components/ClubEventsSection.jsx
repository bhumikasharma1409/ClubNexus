export default function ClubEventsSection() {

  const events = [
    { title: "Hackathon 2024", date: "15 Jan", status: "upcoming" },
    { title: "ML Workshop", date: "10 Oct", status: "completed" }
  ];

  return (
    <div className="py-10">

      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {events
          .filter(ev => ev.status === "upcoming")
          .map((ev, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-lg border"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {ev.title}
              </h3>
              <p className="text-gray-600 mt-2">{ev.date}</p>
            </div>
          ))}

      </div>

    </div>
  );
}
