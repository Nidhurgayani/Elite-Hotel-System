import { useTaskStore } from "../../store/taskStore";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import StaffNav from "../../components/ui/StaffNav"; // ✅ navigation bar

export default function AssignedTasks() {
  const { tasks, updateTask, completeTask } = useTaskStore();

  // ✅ Only show tasks that are not completed yet
  const assigned = tasks.filter((t) => t.status !== "Completed");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <StaffNav /> {/* ✅ Navigation bar */}
      <h1 className="text-2xl font-bold mb-4">
        Assigned Tasks ({assigned.length})
      </h1>

      <div className="space-y-4">
        {assigned.map((t) => (
          <div key={t.id} className="bg-white border rounded-lg p-4 shadow-sm">
            {/* Title */}
            <div className="font-semibold text-lg text-gray-800">{t.title}</div>
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
  );
}



