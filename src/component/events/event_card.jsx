import { formatDate, formatTime } from "../../utils/formatData&time";
import { FiCalendar, FiClock, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';

const EventCard = ({event}) => {
    return (
       <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{event.eventTitle}</h3>
                  <p className="text-blue-600 text-sm font-semibold mb-1 flex items-center"><FiUser className="mr-2 h-4 w-4" /> {event.name}</p>
                  <p className="text-gray-700 text-sm mb-1 flex items-center"><FiCalendar className="mr-2 h-4 w-4" /> {formatDate(event.dateTime)}</p>
                  <p className="text-gray-700 text-sm mb-1 flex items-center"><FiClock className="mr-2 h-4 w-4" /> {formatTime(event.dateTime)}</p>
                  <p className="text-gray-700 text-sm mb-2 flex items-center"><FiMapPin className="mr-2 h-4 w-4" /> {event.location}</p>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{event.description}</p> 
                  <p className="text-gray-700 text-sm flex items-center"><FiUsers className="mr-2 h-4 w-4" /> Attendees: {event.attendeeCount}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => console.log(`Joined event with ID: ${event.id}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                  >
                    <FiUsers className="mr-2 h-4 w-4" /> Join Event
                  </button>
                </div>
              </div>
    );
};

export default EventCard;