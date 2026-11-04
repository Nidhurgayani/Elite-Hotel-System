import { useState } from "react";

export default function AddStaffModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Staff Member</h2>

        <div className="space-y-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border px-3 py-2 rounded" />
          <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Add Staff</button>
        </div>
      </div>
    </div>
  );
}