import { useMemo } from "react";
import { useBookingStore } from "../../store/bookingStore";

export default function BookingHistory() {
  const rawHistory = useBookingStore((s) => s.history) || [];
  const cancelBooking = useBookingStore((s) => s.cancelBooking);

  // Normalize booking data
  const history = useMemo(() => {
    return rawHistory.map((item) => ({
      id: item.id,
      type: item.type || "Unknown",
      title: item.title || "Untitled",
      status: item.status || "confirmed",
      roomNo: item.roomNo || null,
      time: item.time || null,
      eventDate: item.eventDate || null,
      checkIn: item.checkIn || null,
      checkOut: item.checkOut || null,
      guests: typeof item.guests === "number" ? item.guests : null,
      dietary: item.dietary || null,
      requests: item.requests || "",
      total: typeof item.total === "number" ? item.total : 0,
    }));
  }, [rawHistory]);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/history.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-4">Booking History</h1>

        {history.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {history.map((item, idx) => (
              <li
                key={item.id || idx}
                className="p-4 border rounded bg-white bg-opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.type}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.status === "cancelled"
                        ? "text-red-500"
                        : item.status === "confirmed"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-1 text-gray-900">
                  <strong className="mr-1">{item.title}</strong>
                  {item.roomNo && <span className="text-sm">({item.roomNo})</span>}
                </div>

                {/* Details */}
                <div className="mt-2 text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {item.checkIn && item.checkOut && (
                    <Detail label="Stay">
                      {item.checkIn} → {item.checkOut}
                    </Detail>
                  )}
                  {item.eventDate && <Detail label="Event">{item.eventDate}</Detail>}
                  {item.time && <Detail label="Time">{item.time}</Detail>}
                  {item.guests && <Detail label="Guests">{item.guests}</Detail>}
                  {item.dietary && <Detail label="Dietary">{item.dietary}</Detail>}
                  {item.requests && <Detail label="Requests">{item.requests}</Detail>}
                </div>

                {/* Footer */}
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-base font-semibold text-gray-900">
                    Total: {formatMoney(item.total)}
                  </p>

                  {item.status === "confirmed" && (
                    <button
                      onClick={() => cancelBooking(item.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* 🔹 Reusable detail component */
function Detail({ label, children }) {
  return (
    <div>
      <span className="font-medium text-gray-900">{label}:</span>{" "}
      <span className="text-gray-800">{children}</span>
    </div>
  );
}

/* 🔹 Empty state when no bookings */
function EmptyState() {
  return (
    <div className="p-6 border rounded bg-white bg-opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.7)] text-center">
      <p className="text-gray-800">No bookings yet.</p>
      <p className="text-sm text-gray-600">
        Start by booking a room, hall, or buffet.
      </p>
    </div>
  );
}

/* 🔹 Format money consistently */
function formatMoney(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}
