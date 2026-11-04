export default function BookingReceipt({ booking }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Booking Receipt</h2>
      <p><strong>Room:</strong> {booking.title} ({booking.roomNo})</p>
      <p><strong>Guests:</strong> {booking.guests}</p>
      <p><strong>Check-in:</strong> {booking.checkIn}</p>
      <p><strong>Check-out:</strong> {booking.checkOut}</p>
      <p><strong>Special Requests:</strong> {booking.requests || "None"}</p>
      <p className="mt-2 font-bold text-green-700">Total Paid: ${booking.total}</p>
    </div>
  );
}