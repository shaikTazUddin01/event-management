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
      [name]: value,
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
      }).unwrap(); // Use .unwrap() for better RTK Query error handling

      toast.success(response?.message || "Event updated successfully!", {
        id: toastId,
      });
      closeUpdateModal();
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update event.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-base-content text-2xl mb-2">
          {event?.eventTitle}
        </h3>
        <p className="text-primary text-sm font-semibold mb-1 flex items-center">
          <FiUser className="mr-2 h-4 w-4" /> {event?.name}
        </p>
        <p className="text-base-content text-sm mb-1 flex items-center">
          <FiCalendar className="mr-2 h-4 w-4" /> {event?.date}
        </p>
        <p className="text-base-content text-sm mb-1 flex items-center">
          <FiClock className="mr-2 h-4 w-4" /> {event?.time}
        </p>
        <p className="text-base-content text-sm mb-2 flex items-center">
          <FiMapPin className="mr-2 h-4 w-4" /> {event?.location}
        </p>
        <p className="text-base-content/80 text-sm mb-2 line-clamp-2">
          {event?.description}
        </p>
        <p className="text-base-content text-sm flex items-center">
          <FiUsers className="mr-2 h-4 w-4" /> Attendees:{" "}
          {event?.attendeeCount?.length}
        </p>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={openUpdateModal}
            className="btn btn-sm btn-success text-success-content"
          >
            <FiEdit className="h-4 w-4" /> Update
          </button>
          <button
            onClick={() => handleDeleteClick(event?._id)}
            className="btn btn-sm btn-error text-error-content"
          >
            <FiTrash2 className="h-4 w-4" /> Delete
          </button>
        </div>
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
          <h3 className="font-bold text-lg text-base-content">
            Update Event: {event?.eventTitle}
          </h3>
          <form onSubmit={handleFormSubmit} className="py-4 space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-base-content/80">
                  Event Title
                </span>
              </label>
              <input
                type="text"
                name="eventTitle"
                value={formData.eventTitle}
                onChange={handleFormChange}
                placeholder="Event Title"
                className="input input-bordered w-full text-base-content"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-base-content/80">
                  Description
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Event Description"
                className="textarea textarea-bordered w-full text-base-content"
                required
              ></textarea>
            </div>
            <div>
              <label className="label">
                <span className="label-text text-base-content/80">
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="Event Location"
                className="input input-bordered w-full text-base-content"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-base-content/80">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="input input-bordered w-full text-base-content"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-base-content/80">Time</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="input input-bordered w-full text-base-content"
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
                className="btn btn-ghost"
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
