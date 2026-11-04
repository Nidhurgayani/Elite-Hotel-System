import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import CustomerSidebar from "./CustomerSidebar";
import StaffSidebar from "./StaffSidebar";
import Header from "./Header";
import { useAuthStore } from "../../store/authStore";

export default function MainLayout({ type }) {
  const { user, logout } = useAuthStore(); // ✅ use hook directly
  const navigate = useNavigate();
  const location = useLocation();

  const title =
    type === "admin"
      ? "Elite Hotel Admin"
      : type === "customer"
      ? "Elite Hotel"
      : type === "staff"
      ? "Elite Hotel Staff"
      : "Elite Hotel System";

  const handleLogout = () => {
    logout(); // ✅ clears user
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar based on role */}
      {type === "admin" && <AdminSidebar />}
      {type === "staff" && <StaffSidebar />}
      {type === "customer" && (
        <div className="flex flex-col w-64 border-r shadow-sm bg-white">
          <CustomerSidebar />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header
          title={title}
          userName={user?.name}
          onLogout={handleLogout} // ✅ consistent logout
        />
        <main className="p-4 overflow-auto">
          {/* ✅ Outlet ensures nested routes render */}
          <Outlet key={location.pathname} />
        </main>
      </div>
    </div>
  );
}





