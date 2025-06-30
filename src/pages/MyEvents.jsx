import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import EventCard from "../component/my-events/event_card";

const MyEvents = () => {
  const [events, setEvents] = useState([
    {
      id: "event-1",
      eventTitle: "Annual Tech Innovation Summit",
      name: "John Doe",
      dateTime: "2025-07-15T10:00",
      location: "Convention Center, Cityville",
      description:
        "A leading summit for tech enthusiasts and innovators, featuring keynote speakers and interactive workshops. Explore the future of AI and software development.",
      attendeeCount: 150,
    },
    {
      id: "event-2",
      eventTitle: "Community Cleanup Drive",
      name: "Jane Smith",
      dateTime: "2025-07-20T09:00",
      location: "City Park",
      description:
        "Join us to make our city cleaner and greener! Volunteers needed for litter collection and planting.",
      attendeeCount: 45,
    },
  ]);

  const handleDeleteClick = (eventId) => {
    console.log(eventId);
  };

  const handleUpdateClick = (eventId) => {
    console.log(`Update event with ID: ${eventId}`);
    console.log(`Navigating to update form for event ID: ${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 pb-20">
      <div className=" mx-auto max-w-4xl   space-y-8 animate-fade-in-down relative">
        <div className="text-center pt-8">
          <h2 className="text-3xl font-extrabold text-gray-900">My Events</h2>
          <p className="mt-2 text-sm text-gray-600">Manage your events here.</p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold">
              You haven't added any events yet.
            </p>
            <p className="mt-2">Start by creating a new event!</p>
            <a
              href="/add-event"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Add New Event
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                handleDeleteClick={handleDeleteClick}
                handleUpdateClick={handleUpdateClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
