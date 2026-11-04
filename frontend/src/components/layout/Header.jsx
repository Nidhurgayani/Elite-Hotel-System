import { LogOut } from "lucide-react";

export default function Header({ title, userName, onLogout }) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-3">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        {userName && <span className="text-sm text-gray-600">Welcome, {userName}</span>}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}
