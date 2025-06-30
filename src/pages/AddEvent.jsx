import { useState } from "react";
import { toast, Toaster } from "sonner";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiTag,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import { useAddEventMutation } from "../redux/features/event/event.api";
import { useSelector } from "react-redux";

const inputBase =
  "block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
const iconStyle = "h-5 w-5 text-gray-400";

const AddEvent = () => {
  const userInfo = useSelector((state) => state.auth.user);

  const [eventTitle, setEventTitle] = useState("");
  const [name, setName] = useState(userInfo?.name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [addNewEvent] = useAddEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!eventTitle || !name || !date || !time || !location || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const eventDateTime = `${date}T${time}`;
    const newEvent = {
      eventTitle,
      name,
      dateTime: eventDateTime,
      location,
      description,
      attendeeCount: 0,
    };

    console.log("New event details:", newEvent);
    const toastId = toast.loading("added new event...");

    try {
      const response = await addNewEvent(newEvent);
      console.log(response);

      if (response.data) {
        toast.success("New Event Added Successfully", { id: toastId });
      } else {
        toast.error("Something went wrong while adding the event", {
          id: toastId,
        });
      }
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage, { id: toastId });
    }

    // Reset form
    setEventTitle("");
    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 md:p-10 rounded-2xl shadow-2xl space-y-8 animate-fade-in-down relative">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
            <FiCalendar className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Add New Event
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to create your event.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiTag className={iconStyle} />
            </div>
            <input
              id="eventTitle"
              name="eventTitle"
              type="text"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className={inputBase}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className={iconStyle} />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name (Who posted this event)"
              value={name}
              className={`cursor-not-allowed ${inputBase}`}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className={iconStyle} />
              </div>
              <input
                id="date"
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputBase}
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiClock className={iconStyle} />
              </div>
              <input
                id="time"
                name="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputBase}
                required
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className={iconStyle} />
            </div>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputBase}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
              <FiFileText className={iconStyle} />
            </div>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputBase} resize-none`}
              required
            ></textarea>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Add Event
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddEvent;
