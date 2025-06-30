import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

const EventCard = ({ event, handleUpdateClick, handleDeleteClick }) => {
  return (
    <div
      key={event.id}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
    >
      <div className="flex-1 text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {event.eventTitle}
        </h3>
        <p className="text-blue-600 text-sm font-semibold mb-1 flex items-center">
          <FiUser className="mr-2 h-4 w-4" /> {event.name}
        </p>
        <p className="text-gray-700 text-sm mb-1 flex items-center">
          <FiCalendar className="mr-2 h-4 w-4" /> {event.dateTime}
        </p>
        <p className="text-gray-700 text-sm mb-1 flex items-center">
          <FiClock className="mr-2 h-4 w-4" /> {event.dateTime}
        </p>
        <p className="text-gray-700 text-sm mb-2 flex items-center">
          <FiMapPin className="mr-2 h-4 w-4" /> {event.location}
        </p>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {event.description}
        </p>
        <p className="text-gray-700 text-sm flex items-center">
          <FiUsers className="mr-2 h-4 w-4" /> Attendees: {event.attendeeCount}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
        <button
          onClick={() => handleUpdateClick(event.id)}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
        >
          <FiEdit className="mr-2 h-4 w-4" /> Update
        </button>
        <button
          onClick={() => handleDeleteClick(event.id)}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
        >
          <FiTrash2 className="mr-2 h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
