// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children, roles }) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    // Not authenticated → go to login, preserve intended path
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user.role?.toLowerCase();
  if (roles && !roles.includes(userRole)) {
    // Authenticated but wrong role → send to their own dashboard
    const target =
      userRole === "admin" ? "/admin" : userRole === "staff" ? "/staff" : "/customer";
    return <Navigate to={target} replace />;
  }

  return children;
}



