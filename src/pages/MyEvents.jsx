import { useSelector } from "react-redux";
import { FiInfo } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import EventCard from "../component/my-events/event_card";
import { useDeleteEventMutation, useGetMyEventQuery } from "../redux/features/event/event.api";

const MyEvents = () => {
  const userEmail = useSelector((state) => state?.auth?.user?.email);

  const { data } = useGetMyEventQuery(userEmail);
  const [deleteEvent] = useDeleteEventMutation();

  const events = data?.result;

  const handleDeleteClick = (eventId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting event...");
        try {
          const response = await deleteEvent(eventId).unwrap();
          toast.success(response?.message || "Event deleted successfully!", { id: toastId });
        } catch (error) {
          const errorMessage = error?.data?.message || error?.message || "Failed to delete event.";
          toast.error(errorMessage, { id: toastId });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="mx-auto max-w-4xl space-y-8 relative">
        <div className="text-center pt-8">
          <h2 className="text-3xl font-extrabold text-base-content">My Events</h2>
          <p className="mt-2 text-sm text-base-content/70">Manage your events here.</p>
        </div>

        {events?.length === 0 ? (
          <div className="text-center py-10 text-base-content/70">
            <FiInfo className="mx-auto h-12 w-12 text-base-content/50 mb-4" />
            <p className="text-xl font-semibold">You haven't added any events yet.</p>
            <p className="mt-2">Start by creating a new event!</p>
            <a
              href="/add-event"
              className="mt-6 inline-block bg-primary text-primary-content px-6 py-3 rounded-lg shadow-md hover:bg-primary-focus transition-colors duration-200"
            >
              Add New Event
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {events?.map((event) => (
              <EventCard key={event?._id} event={event} handleDeleteClick={handleDeleteClick} />
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default MyEvents;