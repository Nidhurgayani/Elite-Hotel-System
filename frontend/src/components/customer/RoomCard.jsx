import { useState } from "react";
import RoomBookingForm from "./RoomBookingForm";

const RoomCard = ({ room }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white border rounded p-4 shadow-md">
      <h3 className="text-lg font-semibold">{room.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{room.roomNo}</p>
      <p className="text-sm text-gray-600 mb-1">Price: ${room.price} / night</p>
      <p className="text-green-600 font-semibold mb-2">Status: {room.status}</p>

      <ul className="text-sm list-disc list-inside text-gray-700 mb-4">
        {room.amenities.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowForm(true)}
      >
        Book Now
      </button>

      {showForm && (
        <RoomBookingForm
          type={room.title}
          price={room.price}
          room={room.roomNo}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default RoomCard;