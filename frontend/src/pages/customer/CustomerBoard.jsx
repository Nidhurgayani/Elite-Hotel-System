import { useNavigate } from "react-router-dom";

export default function CustomerBoard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Elite Hotel Dashboard</h2>
      <div className="grid gap-4">
        <button onClick={() => navigate("/customer/book-hall")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Hall
        </button>
        <button onClick={() => navigate("/customer/book-room")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Room
        </button>
        <button onClick={() => navigate("/customer/book-buffet")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Book Buffet
        </button>
        <button onClick={() => navigate("/customer/history")} className="bg-gray-600 text-white px-4 py-2 rounded">
          Booking History
        </button>
      </div>
    </div>
  );
}
