import { Link } from "react-router-dom";

export default function StaffNav() {
  return (
    <div className="flex gap-2 mb-4">
      <Link to="/staff" className="px-3 py-2 border rounded bg-white">
        Dashboard
      </Link>
      <Link to="/staff/assigned" className="px-3 py-2 border rounded bg-white">
        Assigned Tasks
      </Link>
      <Link to="/staff/history" className="px-3 py-2 border rounded bg-white">
        Work History
      </Link>
    </div>
  );
}

