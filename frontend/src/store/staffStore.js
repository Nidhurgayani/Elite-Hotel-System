import { create } from "zustand";

const initial = [
  {
    id: "sarah",
    name: "Sarah Wilson",
    email: "sarah@elitehotel.com",
    phone: "+94772345678",
    department: "Housekeeping",
    tasks: "0 active",
  },
  {
    id: "michael",
    name: "Michael Chen",
    email: "michael@elitehotel.com",
    phone: "+94773456789",
    department: "Restaurant",
    tasks: "0 active",
  },
];

export const useStaffStore = create((set) => ({
  staff: initial,
  addStaff: (entry) => set((s) => ({ staff: [...s.staff, entry] })),
  updateStaff: (id, patch) =>
    set((s) => ({
      staff: s.staff.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })),
  removeStaff: (id) =>
    set((s) => ({ staff: s.staff.filter((m) => m.id !== id) })),
}));
