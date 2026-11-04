import { useState, useEffect } from "react";
import { useCustomerStore } from "../../store/customerStore";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import AddCustomerModal from "../../components/admin/AddCustomerModal";
import EditCustomerModal from "../../components/admin/EditCustomerModal";

export default function CustomerManagement() {
  const { customers, removeCustomer, fetchCustomers } = useCustomerStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columns = ["NAME", "EMAIL", "PHONE", "DEPARTMENT", "TOTAL BOOKINGS", "TOTAL SPENT"];

  const filteredData = customers
    .filter((c) => {
      const term = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.toLowerCase().includes(term)
      );
    })
    .map((c) => ({
      id: c._id || c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      department: c.department || "-",
      "total bookings": c.totalBookings || 0,
      "total spent": c.totalSpent || "$0.00",
    }));

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/adcus.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Customer Management</h2>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddModal(true)}>+ Add Customer</Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded w-full max-w-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-blue-300 underline"
            >
              Clear
            </button>
          )}
        </div>

        <Table
          columns={columns}
          data={filteredData}
          renderActions={(row) => (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setEditingCustomer(row)}>
                <Pencil size={16} />
              </Button>
              <Button variant="danger" onClick={() => removeCustomer(row.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        />

        {showAddModal && (
          <AddCustomerModal
            onClose={() => {
              setShowAddModal(false);
              fetchCustomers();
            }}
          />
        )}

        {editingCustomer && (
          <EditCustomerModal
            customer={editingCustomer}
            onClose={() => {
              setEditingCustomer(null);
              fetchCustomers();
            }}
          />
        )}
      </div>
    </div>
  );
}
