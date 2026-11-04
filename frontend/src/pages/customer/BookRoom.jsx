import { useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import PaymentTrigger from "../../components/payment/PaymentTrigger";
import BookingReceipt from "../../components/payment/BookingReceipt";
import { useNavigate } from "react-router-dom";

export default function BookRoom() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const addBooking = useBookingStore((state) => state.bookItem);
  const getStats = useBookingStore((state) => state.getStats);
  const stats = getStats();
  const navigate = useNavigate();

  const rooms = [
    {
      title: "Single Room",
      roomNo: "Room 101",
      price: 80,
      status: "Available",
      amenities: ["WiFi", "TV", "AC"],
    },
    {
      title: "Double Room",
      roomNo: "Room 201",
      price: 120,
      status: "Available",
      amenities: ["WiFi", "TV", "AC", "Mini Fridge"],
    },
    {
      title: "Deluxe Room",
      roomNo: "Room 401",
      price: 150,
      status: "Available",
      amenities: ["WiFi", "Air Conditioning", "TV", "Mini Bar", "Room Service"],
    },
  ];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return Math.max(0, diff);
  };

  const totalCost = selectedRoom ? calculateNights() * selectedRoom.price : 0;

  const handleConfirm = () => {
    if (!selectedRoom || !checkIn || !checkOut) return;

    addBooking({
      type: "Room",
      title: selectedRoom.title,
      roomNo: selectedRoom.roomNo,
      guests,
      checkIn,
      checkOut,
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
      style={{ backgroundImage: "url('/images/room.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-6 rounded-lg">
        {/* Top Summary Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Bookings" value={stats.total} />
          <StatCard label="Active Bookings" value={stats.active} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Total Spent" value={`$${stats.spent}`} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">Book a Room</h1>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.roomNo} className="bg-white bg-opacity-90 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{room.title}</h2>
              <p className="text-gray-800 mb-1">{room.roomNo}</p>
              <p className="text-gray-800 mb-1">Price: ${room.price} per night</p>
              <p className="text-green-700 font-semibold mb-2">Status: {room.status}</p>
              <p className="text-sm font-semibold text-gray-900 mb-1">Amenities:</p>
              <ul className="list-disc list-inside text-sm text-gray-800 mb-4">
                {room.amenities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedRoom(room);
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
      {selectedRoom && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedRoom(null)}
          ></div>
          <div className="relative z-[10000] bg-white bg-opacity-95 p-6 rounded-lg w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Book {selectedRoom.title}</h2>
            <p className="text-gray-800 mb-1">{selectedRoom.roomNo}</p>
            <p className="text-gray-800 mb-1">${selectedRoom.price} per night</p>
            <p className="text-green-700 font-semibold mb-4">Status: {selectedRoom.status}</p>

            {!showPayment && !showReceipt && (
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  label="Check-in Date"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
                <InputField
                  label="Check-out Date"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
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
                    {calculateNights()} nights × ${selectedRoom.price} = ${totalCost}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRoom(null)}
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
                  title: selectedRoom.title,
                  roomNo: selectedRoom.roomNo,
                  guests,
                  checkIn,
                  checkOut,
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
