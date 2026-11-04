import { LayoutDashboard, Users, UserSquare2, CheckSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const linkBase = "flex items-center gap-2 px-4 py-2 rounded";
const active = "bg-blue-100 text-blue-700";
const idle = "text-gray-700 hover:bg-gray-100";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="px-4 py-3 font-bold">Menu</div>
      <nav className="space-y-1">
        <NavLink to="/admin" end className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <LayoutDashboard size={18} /> Overview
        </NavLink>
        <NavLink to="/admin/staff" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <Users size={18} /> Staff Management
        </NavLink>
        <NavLink to="/admin/customers" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <UserSquare2 size={18} /> Customer Management
        </NavLink>
        <NavLink to="/admin/tasks" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <CheckSquare size={18} /> Task Management
        </NavLink>
      </nav>
    </aside>
  );
}
