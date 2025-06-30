import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useAddEventMutation } from "../redux/features/event/event.api";
import { useSelector } from "react-redux";

const inputBase =
  "input input-bordered w-full px-3 py-3 placeholder:text-base-content/60 text-base-content rounded-lg focus:outline-none focus:ring-primary focus:border-primary text-sm";

const AddEvent = () => {
  const userInfo = useSelector((state) => state.auth.user);

  const [eventTitle, setEventTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [addNewEvent, { isLoading }] = useAddEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const posterName = userInfo?.name;
    const posterEmail = userInfo?.email;

    if (!eventTitle || !posterName || !date || !time || !location || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const newEvent = {
      eventTitle,
      name: posterName,
      email: posterEmail,
      dateTime: new Date(`${date}T${time}`).toISOString(),
      date,
      time,
      location,
      description,
      attendeeCount: []
    };

    const toastId = toast.loading("Adding new event...");

    try {
      const response = await addNewEvent(newEvent).unwrap();
      toast.success(response?.message || "New Event Added Successfully", { id: toastId });
    } catch (apiError) {
      const errorMessage = apiError?.data?.message || apiError?.message || "An unexpected error occurred while adding the event";
      toast.error(errorMessage, { id: toastId });
    }

    setEventTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-base-100 p-8 md:p-10 rounded-2xl shadow-2xl space-y-8 animate-fade-in-down relative">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-base-content">
            Add New Event
          </h2>
          <p className="mt-2 text-sm text-base-content/70">
            Fill in the details below to create your event.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-base-content">
          <div>
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

          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name (Who posted this event)"
              value={userInfo?.name || ''}
              className={`cursor-not-allowed ${inputBase}`}
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
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

            <div>
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

          <div>
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

          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Event Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`textarea textarea-bordered w-full px-3 py-3 placeholder:text-base-content/60 text-base-content rounded-lg focus:outline-none focus:ring-primary focus:border-primary text-sm resize-none`}
              required
            ></textarea>
          </div>

          {error && (
            <div
              className="bg-error/10 border border-error text-error px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary text-primary-content text-lg font-semibold rounded-lg hover:bg-primary-focus cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Adding Event..." : "Add Event"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddEvent;