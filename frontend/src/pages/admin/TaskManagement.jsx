import React, { useState, useEffect } from "react";
import { useTaskStore } from "../../store/taskStore";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Tabs from "../../components/ui/Tabs";
import TaskAssignModal from "../../components/admin/TaskAssignModal"; // ✅ updated import

export default function TaskManagement() {
  const {
    getVisibleTasks,
    fetchTasks,
    updateTask,
    removeTask,
    searchQuery,
    sortBy,
    assignedToFilter,
    setSearchQuery,
    setSortBy,
    setAssignedToFilter,
    tasks,
  } = useTaskStore();

  const [active, setActive] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTabs = ["All", "Pending", "In Progress", "Completed"];
  const filtered = getVisibleTasks().filter((t) =>
    active === "All" ? true : t.status === active
  );

  const staffOptions = ["All", ...new Set(tasks.map((t) => t.assignedTo))];

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/overview.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="bg-black bg-opacity-60 p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Task Management</h2>
          <Button onClick={() => setShowModal(true)}>+ Assign Task</Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border px-3 py-2 rounded w-full sm:w-auto flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
          <select
            className="border px-3 py-2 rounded"
            value={assignedToFilter}
            onChange={(e) => setAssignedToFilter(e.target.value)}
          >
            {staffOptions.map((name) => (
              <option key={name} value={name}>
                {name === "All" ? "All Staff" : name}
              </option>
            ))}
          </select>
        </div>

        <Tabs tabs={filterTabs} value={active} onChange={setActive} />

        {showModal && (
          <TaskAssignModal
            onClose={() => {
              setShowModal(false);
              fetchTasks(); // ✅ refresh after closing modal
            }}
          />
        )}

        <div className="bg-white bg-opacity-90 border rounded">
          <div className="grid grid-cols-1 divide-y">
            {filtered.map((t) => (
              <div key={t.id} className="p-4">
                <div className="font-semibold text-gray-900">{t.title}</div>
                <div className="text-sm text-gray-700">{t.description}</div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge
                    tone={
                      t.priority === "High"
                        ? "danger"
                        : t.priority === "Medium"
                        ? "info"
                        : "default"
                    }
                  >
                    {t.priority} priority
                  </Badge>
                  <Badge>{t.category}</Badge>
                  <Badge
                    tone={
                      t.status === "Pending"
                        ? "warning"
                        : t.status === "In Progress"
                        ? "info"
                        : "success"
                    }
                  >
                    {t.status}
                  </Badge>
                  <Badge tone="neutral">{t.assignedTo}</Badge>
                  <span className="text-xs text-gray-600">Due: {t.dueDate}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => updateTask(t.id, { status: "In Progress" })}
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => updateTask(t.id, { status: "Completed" })}
                  >
                    Complete
                  </Button>
                  <Button variant="danger" onClick={() => removeTask(t.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
