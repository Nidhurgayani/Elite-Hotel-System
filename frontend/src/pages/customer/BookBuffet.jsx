import { useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import PaymentTrigger from "../../components/payment/PaymentTrigger";
import BookingReceipt from "../../components/payment/BookingReceipt";
import { useNavigate } from "react-router-dom";

export default function BookBuffet() {
  const [selectedBuffet, setSelectedBuffet] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(50);
  const [specialRequest, setSpecialRequest] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const addBooking = useBookingStore((state) => state.bookItem);
  const getStats = useBookingStore((state) => state.getStats);
  const stats = getStats();
  const navigate = useNavigate();

  const buffets = [
    {
      title: "Continental Breakfast",
      buffetId: "buffet1",
      pricePerGuest: 25,
      time: "Morning",
      menu: ["Eggs", "Toast", "Bacon", "Tea", "Coffee"],
    },
    {
      title: "International Lunch",
      buffetId: "buffet2",
      pricePerGuest: 35,
      time: "Afternoon",
      menu: ["Salads", "Pasta", "Grilled Chicken", "Rice"],
    },
    {
      title: "Seafood Dinner",
      buffetId: "buffet3",
      pricePerGuest: 50,
      time: "Evening",
      menu: ["Fish", "Shrimp", "Crab"],
    },
  ];

  const totalCost = selectedBuffet ? guests * selectedBuffet.pricePerGuest : 0;

  const handleConfirm = () => {
    if (!selectedBuffet || !eventDate) return;

    addBooking({
      type: "Buffet",
      title: selectedBuffet.title,
      buffetId: selectedBuffet.buffetId,
      guests,
      eventDate,
      requests: specialRequest,
      total: totalCost,
    });

    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowReceipt(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/buffet.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg">
        {/* Top Summary Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Bookings" value={stats.total} />
          <StatCard label="Active Bookings" value={stats.active} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Total Spent" value={`$${stats.spent}`} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">Book a Buffet</h1>

        {/* Buffet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buffets.map((buffet) => (
            <div key={buffet.buffetId} className="bg-white bg-opacity-90 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{buffet.title}</h2>
              <p className="text-gray-800 mb-1">Time: {buffet.time}</p>
              <p className="text-gray-800 mb-1">Price: ${buffet.pricePerGuest} per guest</p>
              <p className="text-green-700 font-semibold mb-2">Status: Available</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">Menu:</p>
              <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
                {buffet.menu.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedBuffet(buffet);
                  setShowPayment(false);
                  setShowReceipt(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedBuffet && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedBuffet(null)}
          ></div>
          <div className="relative z-[10000] bg-white bg-opacity-95 p-6 rounded-lg w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Book {selectedBuffet.title}</h2>
            <p className="text-gray-800 mb-1">Time: {selectedBuffet.time}</p>
            <p className="text-gray-800 mb-1">Price per guest: ${selectedBuffet.pricePerGuest}</p>
            <p className="text-green-700 font-semibold mb-4">Status: Available</p>

            {!showPayment && !showReceipt && (
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Event Date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <InputField
                  label="Number of Guests"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
                <InputField
                  label="Special Requests"
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Any special requirements or preferences..."
                />
                <div className="flex justify-between items-center mt-6">
                  <p className="text-lg font-semibold text-gray-900">
                    {guests} guests × ${selectedBuffet.pricePerGuest} = ${totalCost}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedBuffet(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showPayment && !showReceipt && (
              <PaymentTrigger amount={totalCost} onSuccess={handlePaymentSuccess} />
            )}

            {showReceipt && (
              <BookingReceipt
                booking={{
                  title: selectedBuffet.title,
                  buffetId: selectedBuffet.buffetId,
                  guests,
                  eventDate,
                  requests: specialRequest,
                  total: totalCost,
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable stat card
function StatCard({ label, value }) {
  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 text-center">
      <p className="text-sm text-gray-700">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// Reusable input field
function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded px-2 py-2"
      />
    </div>
  );
}
