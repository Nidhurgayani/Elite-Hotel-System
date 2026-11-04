import { useTaskStore } from "../../store/taskStore";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard"; // ✅ summary cards
import StaffNav from "../../components/ui/StaffNav"; // ✅ navigation bar

export default function WorkHistory() {
  const { tasks } = useTaskStore();
  const history = tasks.filter((t) => t.status === "Completed");

  // ✅ Completed today count
  const today = new Date().toLocaleDateString();
  const completedToday = history.filter((t) =>
    t.completedDate?.includes(today)
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <StaffNav /> {/* ✅ Navigation bar */}

      <h1 className="text-2xl font-bold mb-4">
        Work History ({history.length})
      </h1>

      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard title="Completed Tasks" value={history.length} tone="success" />
        <StatCard title="Completed Today" value={completedToday} tone="info" />
      </div>

      {history.length === 0 ? (
        <div className="bg-white border rounded p-4 text-sm text-gray-600">
          No completed tasks yet.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((t) => (
            <div key={t.id} className="bg-white border rounded-lg p-4 shadow-sm">
              {/* Title and status */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg text-gray-800">{t.title}</div>
                <Badge tone="success">Completed</Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1">{t.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
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
                <span className="text-xs text-gray-500">Due: {t.dueDate}</span>
              </div>

              {/* Completed date */}
              <div className="mt-2 text-xs text-gray-500">
                Completed on: {t.completedDate || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



