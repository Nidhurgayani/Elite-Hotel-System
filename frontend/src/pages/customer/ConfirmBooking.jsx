import { useState } from "react";
import { useCustomerStore } from "../../store/customerStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConfirmBooking() {
  const {
    selectedItem,
    resetBooking,
    setPaymentDetails,
    currentCustomerId,
  } = useCustomerStore();

  const navigate = useNavigate();

  if (!selectedItem) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700">No hall selected. Please go back and choose one.</p>
        <button
          onClick={() => navigate("/customer")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { title, capacity, pricePerGuest, _id } = selectedItem;
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(50);
  const [requests, setRequests] = useState("");
  const [loading, setLoading] = useState(false);

  const total = guests * pricePerGuest;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const payload = {
        type: "Hall",
        title,
        hall: _id,
        pricePerGuest,
        guests,
        eventDate,
        requests,
        userId: currentCustomerId,
        total,
      };

      const res = await axios.post("/api/bookings", payload);

      if (res.data.success) {
        setPaymentDetails(payload); // Store for payment
        navigate("/customer/payment"); // Go to payment screen
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetBooking();
    navigate("/customer"); // Back to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Book {title}</h2>
        <p className="mb-1">Capacity: {capacity} guests</p>
        <p className="mb-4">Price per guest: ${pricePerGuest}</p>

        <label className="block mt-4 font-medium">Event Date:</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />

        <label className="block mt-4 font-medium">Guests:</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded"
          min={1}
          max={capacity}
        />

        <label className="block mt-4 font-medium">Special Requests:</label>
        <textarea
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />

        <p className="mt-4 font-semibold text-lg">Total: ${total}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded"
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
