import { useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import PaymentForm from "../payment/PaymentForm";

export default function RoomBookingForm({ room, onClose }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [requests, setRequests] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const { bookItem } = useBookingStore();
  const totalPrice = room.price * Number(guests);

  const handleSubmit = () => {
    bookItem({
      type: "Room Booking",
      status: "confirmed",
      checkIn,
      checkOut,
      guests: Number(guests),
      room: room.title,
      requests,
      price: totalPrice,
    });
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative z-[10000] bg-white rounded-lg p-6 w-full max-w-lg shadow-xl border">
        {!confirmed ? (
          <>
            <h2 className="text-xl font-semibold mb-3">Book {room.title}</h2>
            <p className="text-sm text-gray-600 mb-4">Price: ${room.price} / night</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border rounded px-2 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border rounded px-2 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Guests</label>
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border rounded px-2 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Special Requests</label>
                <textarea
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  className="w-full border rounded px-2 py-2"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border bg-gray-100 text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Confirm Booking
              </button>
            </div>
          </>
        ) : (
          <PaymentForm
            amount={totalPrice}
            roomDetails={{
              title: room.title,
              roomNo: room.roomNo,
              price: room.price,
              status: room.status,
              checkIn,
              checkOut,
              guests,
              requests,
            }}
          />
        )}
      </div>
    </div>
  );
}

  