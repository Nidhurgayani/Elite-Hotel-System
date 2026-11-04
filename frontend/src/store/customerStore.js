import { create } from "zustand";
import axios from "axios";

export const useCustomerStore = create((set, get) => ({
  // 🧑 Customer state
  customers: [],
  currentCustomerId: null,

  // 📦 Booking flow
  selectedItem: null,
  paymentDetails: null,

  // 🚀 Start booking
  startBooking: (item) => set({ selectedItem: item }),

  // ✏️ Update booking details
  updateBookingDetails: (details) =>
    set((state) => ({
      selectedItem: {
        ...state.selectedItem,
        ...details,
        total: details.guests * state.selectedItem.pricePerGuest,
      },
    })),

  // ✅ Confirm booking (persist to backend)
  confirmBooking: async () => {
    const { selectedItem, currentCustomerId } = get();
    if (!selectedItem || !currentCustomerId) return;

    try {
      const res = await axios.post("/api/bookings", {
        ...selectedItem,
        userId: currentCustomerId,
      });

      if (res.data.success) {
        set({ paymentDetails: res.data.booking });
        return res.data.booking;
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err.message);
      alert("Error occurred while booking");
    }
  },

  // 💳 Complete payment
  completePayment: () => set({ selectedItem: null, paymentDetails: null }),

  // 🔄 Reset booking
  resetBooking: () => set({ selectedItem: null, paymentDetails: null }),

  // 🔁 Fetch customers
  fetchCustomers: async () => {
    try {
      const res = await axios.get("/api/customers");
      if (res.data.success) set({ customers: res.data.customers });
    } catch (err) {
      console.error("Failed to fetch customers:", err.message);
    }
  },

  // ➕ Add customer
  addCustomer: async (entry) => {
    try {
      const res = await axios.post("/api/customers", entry);
      if (res.data.success) {
        set((state) => ({ customers: [...state.customers, res.data.customer] }));
      }
    } catch (err) {
      console.error("Failed to add customer:", err.message);
    }
  },

  // ❌ Remove customer
  removeCustomer: async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      set((state) => ({
        customers: state.customers.filter((c) => c._id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete customer:", err.message);
    }
  },

  // 🛠️ Update customer
  updateCustomer: async (id, patch) => {
    try {
      const res = await axios.put(`/api/customers/${id}`, patch);
      if (res.data.success) {
        set((state) => ({
          customers: state.customers.map((c) =>
            c._id === id ? res.data.customer : c
          ),
        }));
      }
    } catch (err) {
      console.error("Failed to update customer:", err.message);
    }
  },
}));

