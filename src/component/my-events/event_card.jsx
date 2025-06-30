import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "sonner";
import { useUpdateEventMutation } from "../../redux/features/event/event.api";

const EventCard = ({ event, handleDeleteClick }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  useEffect(() => {
    if (event) {
     
      setFormData({
        eventTitle: event.eventTitle || "",
        description: event.description || "",
        location: event.location || "",
        date: event?.date || "",
        time: event?.time || "",
      });
    }
  }, [event]);

  const openUpdateModal = () => setIsUpdateModalOpen(true);
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    if (event) {
      setFormData({
        eventTitle: event.eventTitle || "",
        description: event.description || "",
        location: event.location || "",
        date: event?.date || "",
        time: event?.time || "",
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendeeCount" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!event?._id) {
      toast.error("Event ID not found for update.");
      return;
    }

    const toastId = toast.loading("Updating event...");
    try {
      const payload = {
        eventTitle: formData.eventTitle,
        description: formData.description,
        location: formData.location,
        time: formData.time,
        date: formData.date,
      };

      const response = await updateEvent({
        id: event._id,
        payload,
      });

      if (response?.message) {
        toast.success(response.message, { id: toastId });
      } else {
        toast.success("Event updated successfully!", { id: toastId });
      }
      closeUpdateModal();
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update event.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div
      key={event?._id}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
    >
      <div className="flex-1 text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {event?.eventTitle}
        </h3>
        <p className="text-blue-600 text-sm font-semibold mb-1 flex items-center">
          <FiUser className="mr-2 h-4 w-4" /> {event?.name}
        </p>
        <p className="text-gray-700 text-sm mb-1 flex items-center">
          <FiCalendar className="mr-2 h-4 w-4" /> {event?.date}
        </p>
        <p className="text-gray-700 text-sm mb-1 flex items-center">
          <FiClock className="mr-2 h-4 w-4" /> {event?.time}
        </p>
        <p className="text-gray-700 text-sm mb-2 flex items-center">
          <FiMapPin className="mr-2 h-4 w-4" /> {event?.location}
        </p>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {event?.description}
        </p>
        <p className="text-gray-700 text-sm flex items-center">
          <FiUsers className="mr-2 h-4 w-4" /> Attendees: {event?.attendeeCount}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
        <button
          onClick={openUpdateModal}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <FiEdit className="mr-2 h-4 w-4" /> Update
        </button>
        <button
          onClick={() => handleDeleteClick(event?._id)}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          <FiTrash2 className="mr-2 h-4 w-4" /> Delete
        </button>
      </div>

      {/* modal */}
      <input
        type="checkbox"
        id={`update_event_modal_for_${event?._id}`}
        className="modal-toggle"
        checked={isUpdateModalOpen}
        onChange={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Event: {event?.eventTitle}</h3>
          <form onSubmit={handleFormSubmit} className="py-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Event Title</span>
              </label>
              <input
                type="text"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleFormChange}
                placeholder="Event Title"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Event Description"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="Event Location"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Time</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={closeUpdateModal}
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={`update_event_modal_for_${event?._id}`}
          onClick={closeUpdateModal}
        ></label>
      </div>
    </div>
  );
};

export default EventCard;
