import { useState } from "react";
import { FiSearch, FiSliders, FiInfo } from "react-icons/fi";
import EventCard from "../component/events/event_card";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [events, setEvents] = useState([
    {
      id: "event-5",
      eventTitle: "Global AI Conference 2025",
      name: "AI Innovators Inc.",
      dateTime: "2025-09-01T09:00",
      location: "Virtual Event",
      description:
        "A global conference exploring the latest advancements in Artificial Intelligence, machine learning, and deep learning. Featuring industry leaders and research presentations.",
      attendeeCount: 1200,
    },
    {
      id: "event-6",
      eventTitle: "Startup Pitch Competition",
      name: "Venture Capital Group",
      dateTime: "2025-09-10T15:00",
      location: "Innovation Hub, Tech City",
      description:
        "Watch promising startups present their innovative ideas to a panel of investors. Networking opportunities available.",
      attendeeCount: 250,
    },
    {
      id: "event-7",
      eventTitle: "Sustainable Living Workshop",
      name: "Green Earth Foundation",
      dateTime: "2025-09-22T10:00",
      location: "Community Garden, Eco Village",
      description:
        "Hands-on workshop focusing on sustainable practices, including composting, urban farming, and renewable energy.",
      attendeeCount: 75,
    },
    {
      id: "event-8",
      eventTitle: "Local Food Festival",
      name: "Culinary Delights",
      dateTime: "2025-10-05T12:00",
      location: "Central Plaza",
      description:
        "A celebration of local cuisine, featuring food trucks, restaurant stalls, cooking demonstrations, and live entertainment.",
      attendeeCount: 500,
    },
  ]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterOption("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-8 animate-fade-in-down">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Upcoming All Events
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover and join exciting events around you.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Search Input */}
          <div className="relative col-span-1 md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events by title..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSliders className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="currentWeek">Current Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="currentMonth">Current Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
            {/* Custom dropdown arrow for better styling */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
              </svg>
            </div>
          </div>
          {/* Clear Filters Button (shown only if filters are active) */}
          {(searchTerm || filterOption !== "all") && (
            <div className="col-span-1 md:col-span-3 text-center md:text-right mt-2">
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                Clear Filters <span className="ml-2">X</span>
              </button>
            </div>
          )}
        </div>

        {events.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl font-semibold">
              No events found matching your criteria.
            </p>
            <p className="mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
