import { useState } from "react";
import { useStaffStore } from "../../store/staffStore";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import AddStaffModal from "../../components/admin/AddStaffModal"; // ✅ Modal component

export default function StaffManagement() {
  const { staff, addStaff, removeStaff } = useStaffStore();
  const [showModal, setShowModal] = useState(false);

  const columns = ["NAME", "EMAIL", "PHONE", "DEPARTMENT", "TASKS"];
  const data = staff.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone,
    department: s.department,
    tasks: s.tasks,
  }));

  const handleSubmit = (form) => {
    addStaff({
      id: crypto.randomUUID(),
      name: form.name,
      email: form.email,
      password: form.password, // optional for backend
      phone: form.phone,
      department: form.department,
      tasks: "0 active",
    });
    setShowModal(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/staff.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Staff Management</h2>
          <Button onClick={() => setShowModal(true)}>+ Add Staff</Button>
        </div>

        <Table
          columns={columns}
          data={data}
          renderActions={(row) => (
            <div className="flex gap-2">
              <Button variant="secondary">
                <Pencil size={16} />
              </Button>
              <Button variant="danger" onClick={() => removeStaff(row.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        />

        {showModal && (
          <AddStaffModal
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
