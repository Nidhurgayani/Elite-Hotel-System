import { useCustomerStore } from "../../store/customerStore";
import ConfirmBookingModal from "./ConfirmBookingModal"; // Corrected import
import { useState } from "react";

export default function BuffetCard({ buffet }) {
  const startBooking = useCustomerStore((s) => s.startBooking);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBookNow = () => {
    startBooking({
      type: "Buffet",
      title: buffet.title,
      time: buffet.time,
      pricePerGuest: buffet.price,
      status: buffet.status,
      menu: buffet.menu,
    });
    setShowConfirm(true);
  };

  return (
    <div >
      <h3 className="text-lg font-bold">{buffet.title}</h3>
      <p>Time: {buffet.time}</p>
      <p>Price: ${buffet.price} per guest</p>
      <p>Status: <span className="text-green-600">{buffet.status}</span></p>
      <ul className="text-sm list-disc ml-5">
        {buffet.menu.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <button
        onClick={handleBookNow}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Book Now
      </button>

      {/* Booking confirmation modal */}
      {showConfirm && (
        <ConfirmBookingModal onClose={() => setShowConfirm(false)} />
      )}
    </div>
  );
}