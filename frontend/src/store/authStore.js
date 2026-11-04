// ✅ File: src/store/authStore.js
import { create } from "zustand";

const STORAGE_KEY = "elite:user";

export const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })(),

  // ✅ Login: save user to state and localStorage
  login: (userData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    set({ user: userData });
  },

  // ✅ Logout: clear user from state and localStorage
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },

  // ✅ Load user manually (e.g., on app start)
  loadUser: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      set({ user: parsed });
    } catch {
      set({ user: null });
    }
  },
}));

