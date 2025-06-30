import { FiCalendar, FiClock, FiMapPin, FiUser, FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { useUpdateAttendeeCountMutation } from "../../redux/features/event/event.api";

const EventCard = ({ event }) => {
  const [updateEvent] = useUpdateAttendeeCountMutation();
  const userInfo = useSelector((state) => state.auth.user);

  const hasJoined =
    event?.attendeeCount?.length > 0
      ? event?.attendeeCount?.includes(userInfo?.email)
      : "";

  const handleUpdateAttendeeCount = async (eventId) => {
    if (!userInfo || !userInfo.email) {
      toast.error("Please log in to join the event.");
      return;
    }

    if (hasJoined) {
      toast.info("You have already joined this event!");
      return;
    }

    try {
      const newAttendeeList =
        event.attendeeCount?.length > 0
          ? [...(event.attendeeCount || []), userInfo.email]
          : [userInfo.email];

      const updateData = {
        attendeeCount: newAttendeeList,
      };

      const result = await updateEvent({ id: eventId, data: updateData });

      if (result) {
        toast.success("Successfully joined the event!",{duration:500});
      } else {
        toast.error(result.message || "Failed to join the event.");
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error("An error occurred while joining the event.");
    }
  };

  return (
    <div
      key={event._id}
      className="card card-compact bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-200"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content text-2xl mb-2 leading-tight">
          {event.eventTitle}
        </h3>

        <p className="text-primary text-sm font-semibold mb-1 flex items-center">
          <FiUser className="mr-2 h-4 w-4" /> {event.name}
        </p>

        <p className="text-base-content/80 text-sm mb-1 flex items-center">
          <FiCalendar className="mr-2 h-4 w-4" /> {event.date}
        </p>

        <p className="text-base-content/80 text-sm mb-1 flex items-center">
          <FiClock className="mr-2 h-4 w-4" /> {event.time}
        </p>

        <p className="text-base-content/80 text-sm mb-2 flex items-center">
          <FiMapPin className="mr-2 h-4 w-4" /> {event.location}
        </p>

        <p className="text-base-content/70 text-sm mb-2 line-clamp-3">
          {event.description}
        </p>

        <p className="text-base-content/80 text-sm flex items-center">
          <FiUsers className="mr-2 h-4 w-4" /> Attendees:{" "}
          {event.attendeeCount ? event.attendeeCount.length : 0}
        </p>
      </div>

      <div className="card-actions justify-end p-4 pt-0">
        <button
          onClick={() => handleUpdateAttendeeCount(event?._id)}
          className={`btn btn-block text-sm font-medium ${
            hasJoined
              ? "btn-disabled bg-gray-400 text-white cursor-not-allowed"
              : "btn-primary text-primary-content"
          }`}
          disabled={hasJoined || !userInfo?.email}
        >
          <FiUsers className="mr-2 h-4 w-4" />{" "}
          {hasJoined ? "Already Joined" : "Join Event"}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default EventCard;
