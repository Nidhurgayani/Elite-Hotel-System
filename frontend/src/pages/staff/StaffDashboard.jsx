import StatCard from "../../components/ui/StatCard";
import { useTaskStore } from "../../store/taskStore";
import { useAuthStore } from "../../store/authStore"; // ✅ import auth store
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import StaffNav from "../../components/ui/StaffNav"; // ✅ navigation bar
import { useNavigate } from "react-router-dom"; // ✅ for redirect

export default function StaffDashboard() {
  const { tasks, updateTask, completeTask } = useTaskStore();
  const { logout, user } = useAuthStore(); // ✅ get logout + user name
  const navigate = useNavigate();

  // ✅ Summary counts
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const today = new Date().toLocaleDateString();
  const completedToday = tasks.filter(
    (t) => t.status === "Completed" && t.completedDate?.includes(today)
  ).length;

  const assignedTasks = tasks.filter((t) => t.status !== "Completed");

  const handleLogout = () => {
    logout(); // ✅ clear user
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/staff.jpg')" }}
    >
      {/* Overlay container for readability */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <StaffNav /> {/* ✅ Navigation bar */}

        {/* ✅ Header with Logout */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        {/* ✅ Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Pending Tasks" value={pending} tone="warning" />
          <StatCard title="In Progress" value={inProgress} tone="info" />
          <StatCard title="Completed Today" value={completedToday} tone="success" />
        </div>

        {/* ✅ Assigned Tasks */}
        <h2 className="text-xl font-semibold mb-3">
          Assigned Tasks ({assignedTasks.length})
        </h2>

        <div className="space-y-4">
          {assignedTasks.map((t) => (
            <div key={t.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="font-semibold text-lg text-gray-800">{t.title}</div>
              <p className="text-sm text-gray-600 mt-1">{t.description}</p>

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
                <Badge tone={t.status === "Pending" ? "warning" : "info"}>
                  {t.status}
                </Badge>
                <span className="text-xs text-gray-500">Due: {t.dueDate}</span>
              </div>

              {/* ✅ Action buttons */}
              {t.status === "Pending" && (
                <Button
                  className="mt-4"
                  onClick={() => updateTask(t.id, { status: "In Progress" })}
                >
                  Start Task
                </Button>
              )}

              {t.status === "In Progress" && (
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => completeTask(t.id)}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




