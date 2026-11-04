import { BedSingle, Building2, Utensils, History } from "lucide-react";
import { NavLink } from "react-router-dom";

const linkBase = "flex items-center gap-2 px-4 py-2 rounded";
const active = "bg-blue-100 text-blue-700";
const idle = "text-gray-900 hover:bg-gray-300";

export default function CustomerSidebar() {
  return (
    <aside className="w-64 border-r bg-gray-200">
      <div className="px-4 py-3 font-bold">Menu</div>
      <nav className="space-y-1">
        <NavLink to="/customer" end className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <BedSingle size={18} /> Book Room
        </NavLink>
        <NavLink to="/customer/hall" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <Building2 size={18} /> Book Hall
        </NavLink>
        <NavLink to="/customer/buffet" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <Utensils size={18} /> Book Buffet
        </NavLink>
        <NavLink to="/customer/history" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
          <History size={18} /> Booking History
        </NavLink>
      </nav>
    </aside>
  );
}
