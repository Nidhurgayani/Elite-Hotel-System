import { useCustomerStore } from "../../store/customerStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSlide() {
  const {
    selectedItem,
    step,
    completePayment,
    currentCustomerId,
  } = useCustomerStore();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (step !== "pay" || !selectedItem) return null;

  const {
    title,
    price,
    guests,
    pricePerGuest,
    buffetType,
    eventDate,
    dietary,
    requests,
  } = selectedItem;

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedItem,
          userId: currentCustomerId,
        }),
      });

      const data = await response.json();

      if (data.success || data.booking) {
        completePayment();
        alert("Payment successful! Booking confirmed.");
        navigate("/customer/dashboard");
      } else {
        alert("Payment succeeded but booking failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Pay Invoice</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>{buffetType || title}</strong></p>
          {eventDate && <p>Event Date: {eventDate}</p>}
          {guests && pricePerGuest && (
            <p>
              Guests: {guests} × ${pricePerGuest} = <strong>${price}</strong>
            </p>
          )}
          {dietary && <p>Dietary Preference: {dietary}</p>}
          {requests && <p>Special Requests: {requests}</p>}
        </div>

        {/* Simulated payment form */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Card number"
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="CVC"
            className="border px-2 py-1 rounded w-full mb-4"
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : `🔒 Pay $${price}`}
        </button>
      </div>
    </div>
  );
}