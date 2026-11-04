import { useCustomerStore } from "../../store/customerStore";

export default function HallCard({ hall }) {
  const startBooking = useCustomerStore((s) => s.startBooking);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{hall.title}</h3>
      <p>Capacity: {hall.capacity}</p>
      <p>Price: ${hall.price}</p>
      <button
        onClick={() => startBooking(hall)}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
      >
        Book Now
      </button>
    </div>
  );
}