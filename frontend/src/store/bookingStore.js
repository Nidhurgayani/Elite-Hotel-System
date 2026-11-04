import { create } from "zustand";

// Demo data for rooms, halls, buffets
const initialRooms = [
  {
    id: "room101",
    title: "Single Room (Room 101)",
    price: 80,
    status: "Available",
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar"],
  },
  {
    id: "room201",
    title: "Double Room (Room 201)",
    price: 120,
    status: "Available",
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Balcony"],
  },
  {
    id: "room401",
    title: "Deluxe Room (Room 401)",
    price: 180,
    status: "Available",
    amenities: ["WiFi", "TV", "Air Conditioning", "Mini Bar", "Jacuzzi"],
  },
];

const initialHalls = [
  {
    id: "hall1",
    title: "Grand Ballroom",
    price: 2500,
    capacity: 200,
    status: "Available",
    features: ["Stage", "Sound System", "Lighting", "Dance Floor", "Catering Area"],
  },
  {
    id: "hall2",
    title: "Garden Pavilion",
    price: 1200,
    capacity: 100,
    status: "Available",
    features: ["Outdoor Venue", "Special Lighting", "Tent Coverage", "Decoration Services"],
  },
];

const initialBuffets = [
  {
    id: "bf1",
    title: "Continental Breakfast",
    time: "Morning",
    price: 25,
    status: "Available",
    menu: ["Eggs", "Toast", "Bacon", "Tea", "Coffee"],
    dietary: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "bf2",
    title: "International Lunch",
    time: "Afternoon",
    price: 35,
    status: "Available",
    menu: ["Salads", "Pasta", "Grilled Chicken", "Rice"],
    dietary: ["Vegetarian", "Vegan", "Halal"],
  },
  {
    id: "bf3",
    title: "Seafood Dinner",
    time: "Evening",
    price: 50,
    status: "Available",
    menu: ["Fish", "Shrimp", "Crab"],
    dietary: ["Gluten-Free"],
  },
];

// Demo booking history
const initialHistory = [
  {
    id: "booking-1",
    type: "Room",
    status: "confirmed",
    checkIn: "January 15, 2024 07:30 PM",
    checkOut: "January 18, 2024 08:00 AM",
    guests: 2,
    title: "Deluxe Room (Room 401)",
    requests: "Late checkout requested",
    total: 450,
  },
  {
    id: "booking-3",
    type: "Buffet",
    status: "confirmed",
    eventDate: "January 13, 2024 11:00 AM",
    guests: 4,
    title: "Seafood Dinner",
    dietary: "Vegetarian",
    total: 120,
  },
];

export const useBookingStore = create((set, get) => ({
  rooms: initialRooms,
  halls: initialHalls,
  buffets: initialBuffets,
  history: initialHistory,
  stats: {},

  // 📊 Booking stats
  getStats: () => {
    const history = get().history || [];
    const total = history.length;
    const active = history.filter((b) => b.status === "confirmed").length;
    const pending = history.filter((b) => b.status === "pending").length;
    const spent = history
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + (b.total || 0), 0);
    const user = "Emma Thompson"; // demo user

    return { total, active, pending, spent, user };
  },

  // 📝 Generic booking handler
  bookItem: (entry) => {
    const id = crypto.randomUUID?.() || Date.now().toString();
    const total = entry.total ?? entry.price * (entry.guests || 1);
    const newBooking = {
      id,
      status: entry.status || "confirmed",
      total,
      ...entry,
    };

    const updatedHistory = [newBooking, ...get().history];
    set({
      history: updatedHistory,
      stats: get().getStats(),
    });
  },

  // 🏨 Specific booking helpers
  bookRoom: (room, details) => {
    get().bookItem({
      type: "Room",
      title: room.title,
      roomNumber: room.id,
      price: room.price,
      ...details,
    });
  },

  bookHall: (hall, details) => {
    get().bookItem({
      type: "Hall",
      title: hall.title,
      capacity: hall.capacity,
      price: hall.price,
      ...details,
    });
  },

  bookBuffet: (buffet, details) => {
    get().bookItem({
      type: "Buffet",
      title: buffet.title,
      time: buffet.time,
      price: buffet.price,
      ...details,
    });
  },

  // ❌ Cancel a booking
  cancelBooking: (id) => {
    const updatedHistory = get().history.map((b) =>
      b.id === id ? { ...b, status: "cancelled" } : b
    );
    set({
      history: updatedHistory,
      stats: get().getStats(),
    });
  },

  // ➕ Add booking manually
  addToHistory: (booking) => {
    const updatedHistory = [booking, ...get().history];
    set({
      history: updatedHistory,
      stats: get().getStats(),
    });
  },

  // 🧹 Clear all bookings
  clearHistory: () => {
    set({ history: [], stats: get().getStats() });
  },

  // 🔍 Filter bookings by type
  getAllBookingsByType: (type) => {
    return get().history.filter((b) => b.type === type);
  },
}));
