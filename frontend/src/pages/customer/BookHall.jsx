import { useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import PaymentTrigger from "../../components/payment/PaymentTrigger";
import BookingReceipt from "../../components/payment/BookingReceipt";
import { useNavigate } from "react-router-dom";

export default function BookHall() {
  const [selectedHall, setSelectedHall] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(50);
  const [specialRequest, setSpecialRequest] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const addBooking = useBookingStore((state) => state.bookItem);
  const getStats = useBookingStore((state) => state.getStats);
  const stats = getStats();
  const navigate = useNavigate();

  const halls = [
    {
      title: "Grand Ballroom",
      hallId: "hall1",
      pricePerGuest: 2500,
      capacity: 200,
      time: "Evening",
      features: ["Stage", "Sound System", "Lighting", "Dance Floor", "Catering Area"],
    },
    {
      title: "Garden Pavilion",
      hallId: "hall2",
      pricePerGuest: 1200,
      capacity: 100,
      time: "Afternoon",
      features: ["Outdoor Venue", "Special Lighting", "Tent Coverage", "Decoration Services"],
    },
  ];

  const totalCost = selectedHall ? guests * selectedHall.pricePerGuest : 0;

  const handleConfirm = () => {
    if (!selectedHall || !eventDate) return;

    addBooking({
      type: "Hall",
      title: selectedHall.title,
      hallId: selectedHall.hallId,
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
      style={{ backgroundImage: "url('/images/hall.jpg')" }}
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

        <h1 className="text-3xl font-bold text-white mb-6">Book a Hall</h1>

        {/* Hall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {halls.map((hall) => (
            <div key={hall.hallId} className="bg-white bg-opacity-90 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{hall.title}</h2>
              <p className="text-gray-800 mb-1">Capacity: {hall.capacity} guests</p>
              <p className="text-gray-800 mb-1">Price per guest: ${hall.pricePerGuest}</p>
              <p className="text-gray-800 mb-2">Time: {hall.time}</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">Features:</p>
              <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
                {hall.features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedHall(hall);
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
      {selectedHall && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedHall(null)}
          ></div>
          <div className="relative z-[10000] bg-white bg-opacity-95 p-6 rounded-lg w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Book {selectedHall.title}</h2>
            <p className="text-gray-800 mb-1">Capacity: {selectedHall.capacity} guests</p>
            <p className="text-gray-800 mb-1">Price per guest: ${selectedHall.pricePerGuest}</p>
            <p className="text-gray-800 mb-4">Time: {selectedHall.time}</p>

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
                    {guests} guests × ${selectedHall.pricePerGuest} = ${totalCost}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedHall(null)}
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
                  title: selectedHall.title,
                  hallId: selectedHall.hallId,
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
