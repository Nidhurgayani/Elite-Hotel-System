import { useState } from "react";
import Button from "../ui/Button";
import { useTaskStore } from "../../store/taskStore";

export default function TaskAssignModal({ onClose }) {
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    category: "",
    priority: "Low",
    difficulty: "Medium", // ✅ added difficulty
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { title, description, assignedTo, category, priority, difficulty, dueDate } = formData;

    if (!title || !description || !assignedTo || !category || !priority || !difficulty || !dueDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/tasks/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Task assignment failed");
        return;
      }

      alert("✅ Task assigned successfully");
      fetchTasks();
      onClose();
    } catch (err) {
      console.error("Assign task error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Assign New Task</h2>

        <input name="title" value={formData.title} onChange={handleChange} placeholder="Task title" className="w-full border rounded px-3 py-2 mb-3" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border rounded px-3 py-2 mb-3" />
        <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} placeholder="Assign to (e.g. Sarah Wilson)" className="w-full border rounded px-3 py-2 mb-3" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full border rounded px-3 py-2 mb-3" />
        <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input type="datetime-local" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-4" />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="primary">Assign</Button>
        </div>
      </div>
    </div>
  );
}

