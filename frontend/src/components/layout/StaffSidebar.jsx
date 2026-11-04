import { useLocation } from "react-router-dom";

export default function StaffSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-4 font-bold text-lg text-gray-800">Staff Portal</div>
      <nav className="space-y-1 px-4">
        <a
          href="/staff"
          className={`block px-3 py-2 rounded ${
            isActive("/staff") ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
          } text-gray-700`}
        >
          Dashboard
        </a>
        <a
          href="/staff/assigned"
          className={`block px-3 py-2 rounded ${
            isActive("/staff/assigned") ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
          } text-gray-700`}
        >
          Assigned Tasks
        </a>
        <a
          href="/staff/history"
          className={`block px-3 py-2 rounded ${
            isActive("/staff/history") ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
          } text-gray-700`}
        >
          Work History
        </a>
      </nav>
    </aside>
  );
}

