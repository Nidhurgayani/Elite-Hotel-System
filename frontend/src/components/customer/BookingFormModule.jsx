import { useCustomerStore } from "../../store/customerStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingForm() {
  const { selectedItem, updateBookingDetails } = useCustomerStore();
  const navigate = useNavigate();

  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");

  if (!selectedItem) return <p className="p-6">No hall selected.</p>;

  const handleNext = () => {
    updateBookingDetails({ eventDate, guests, requests });
    navigate("/customer/confirm");
  };

  const handleCancel = () => {
    navigate("/customer");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Book {selectedItem.title}</h2>
      <p>Capacity: {selectedItem.capacity} guests</p>
      <p>Price per guest: ${selectedItem.pricePerGuest}</p>

      <div className="mt-4 space-y-3">
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        />
        <input
          type="text"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="Special requests..."
          className="w-full border rounded px-2 py-1"
        />
        <p className="font-semibold text-lg mt-2">
          Total: ${guests * selectedItem.pricePerGuest}
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-green-600 text-white rounded">
          Confirm
        </button>
      </div>
    </div>
  );
}
