import { useState } from "react";
import { useCustomerStore } from "../../store/customerStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConfirmBooking() {
  const { selectedItem, resetBooking } = useCustomerStore();
  const navigate = useNavigate();

  // If no booking is selected, show a fallback
  if (!selectedItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No booking selected.</p>
      </div>
    );
  }

  const {
    type,         // "Room", "Hall", or "Buffet"
    title,
    roomNumber,
    time,
    pricePerGuest,
    capacity,
    _id,
  } = selectedItem;

  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [dietary, setDietary] = useState("");
  const [requests, setRequests] = useState("");
  const [loading, setLoading] = useState(false);

  // Confirm booking handler
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("No user logged in. Please sign in first.");
        return;
      }

      const payload = {
        type,
        title,
        price: pricePerGuest,
        guests,
        eventDate,
        dietary,
        requests,
        userId,
        total: guests * pricePerGuest,
      };

      if (type === "Room") payload.room = _id;
      if (type === "Hall") payload.hall = _id;
      if (type === "Buffet") payload.buffetType = title;

      const res = await axios.post("/api/bookings", payload);

      if (res.status === 201 || res.data.success) {
        alert(`${type} booking confirmed!`);
        resetBooking();
        navigate("/customer/history"); // ✅ redirect to booking history page
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel booking handler
  const handleCancel = () => {
    resetBooking();
    navigate("/customer"); // ✅ redirect back to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>

        <div className="space-y-2 text-gray-700">
          {title && <p><strong>{title}</strong></p>}
          {type === "Room" && (
            <>
              {roomNumber && <p>Room: {roomNumber}</p>}
              {time && <p>Time: {time}</p>}
            </>
          )}
          {type === "Hall" && capacity && <p>Capacity: {capacity} guests</p>}
          {type === "Buffet" && time && <p>Time: {time}</p>}

          <label className="block mt-2 text-sm">Event Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />

          <label className="block mt-2 text-sm">Guests:</label>
          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
            required
          />

          {type === "Buffet" && (
            <>
              <label className="block mt-2 text-sm">Dietary Preference:</label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </>
          )}

          <label className="block mt-2 text-sm">Special Requests:</label>
          <textarea
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />

          <p className="font-semibold text-lg text-black mt-4">
            Total: ${guests * pricePerGuest}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
