import { create } from "zustand";
import axios from "axios";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  searchQuery: "",
  sortBy: "dueDate",
  assignedToFilter: "All",

  // ✅ Fetch tasks
  fetchTasks: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        set({ tasks: res.data.tasks });
      } else {
        console.error("Failed to load tasks:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  },

  // ✅ Add task
  addTask: async (task) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks/assign", task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        set((state) => ({
          tasks: [res.data.task, ...state.tasks],
        }));
      }
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  },

  // ✅ Update task
  updateTask: async (id, patch) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, patch, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? res.data.task : t)),
        }));
      }
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  },

  // ✅ Delete task
  removeTask: async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  },

  // Filters & sorting
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (field) => set({ sortBy: field }),
  setAssignedToFilter: (name) => set({ assignedToFilter: name }),

  getVisibleTasks: () => {
    const { tasks, searchQuery, sortBy, assignedToFilter } = get();

    return tasks
      .filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((t) => (assignedToFilter === "All" ? true : t.assignedTo === assignedToFilter))
      .sort((a, b) => {
        if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === "priority") {
          const order = { High: 3, Medium: 2, Low: 1 };
          return order[b.priority] - order[a.priority];
        }
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
  },
}));
