import { useState, useEffect } from "react";
import { FiSearch, FiSliders, FiInfo } from "react-icons/fi";
import EventCard from "../component/events/event_card";
import { useGetAllEventQuery } from "../redux/features/event/event.api";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [queryArgs, setQueryArgs] = useState({});

  useEffect(() => {
    const newArgs = {};
    if (searchTerm) {
      newArgs.search_title = searchTerm;
    }
    if (filterOption !== "all") {
      newArgs.date = filterOption;
    }
    setQueryArgs(newArgs);
  }, [searchTerm, filterOption]);

  const { data, isLoading } = useGetAllEventQuery(queryArgs);
  const events = data?.result;

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterOption("all");
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-8 animate-fade-in-down">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-base-content">
            Upcoming All Events
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Discover and join exciting events around you.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="form-control flex-grow w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events by title..."
                className="input input-bordered w-full pl-10 pr-3 py-3 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-primary focus:border-primary text-sm peer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/60 transition-colors duration-200 pointer-events-none z-20" />
            </div>
          </div>

          {/* Filter by date */}
          <div className="form-control w-full md:w-1/3">
            <div className="relative">
              <select
                className="select select-bordered w-full pl-10 pr-3 text-base-content focus:outline-none focus:ring-primary focus:border-primary text-sm peer"
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
              <FiSliders className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/60  transition-colors duration-200 pointer-events-none z-20" />
            </div>
          </div>

          {/* Clear filter */}
          {(searchTerm || filterOption !== "all") && (
            <div className="w-full md:w-auto ">
              <button
                onClick={handleClearFilters}
                className="btn btn-ghost border border-base-content/60 text-base-content/80 hover:text-base-content w-full"
              >
                Clear Filters{" "}
                <span className="ml-2 text-lg leading-none">&times;</span>
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <p className="text-lg text-center text-base-content">
            Loading events...
          </p>
        ) : events?.length === 0 ? (
          <div className="text-center py-10 text-base-content/70">
            <FiInfo className="mx-auto h-12 w-12 text-[base-content/50] mb-4" />
            <p className="text-xl font-semibold">
              No events found matching your criteria.
            </p>
            <p className="mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;