import { useState } from "react";
import { useCustomerStore } from "../../store/customerStore";

export default function AddCustomerModal({ onClose }) {
  const addCustomer = useCustomerStore((s) => s.addCustomer);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, password, department, phone } = formData;
    if (!name || !email || !password || !department || !phone) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting customer:", formData); // ✅ Debug log
      await addCustomer(formData);
      alert("Customer added successfully"); // ✅ Replace with toast if needed
      onClose();
    } catch (err) {
      console.error("Add customer failed:", err.message);
      alert("Failed to add customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center z-50"
      style={{ backgroundImage: "url('/images/admin.jpg')" }}
    >
      {/* Overlay for readability */}
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Customer</h2>

        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">Department</label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Enter department"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2  text-white rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </div>
      </div>
    </div>
  );
}
