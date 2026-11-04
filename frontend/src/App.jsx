import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

// ✅ Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ✅ Admin pages
import Overview from "./pages/admin/Overview";
import StaffManagement from "./pages/admin/StaffManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import TaskManagement from "./pages/admin/TaskManagement";

// ✅ Staff pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import AssignedTasks from "./pages/staff/AssignedTasks";
import WorkHistory from "./pages/staff/WorkHistory";

// ✅ Customer pages
import BookRoom from "./pages/customer/BookRoom";
import BookHall from "./pages/customer/BookHall";
import BookBuffet from "./pages/customer/BookBuffet";
import BookingHistory from "./pages/customer/BookingHistory";
import ConfirmBooking from "./pages/customer/ConfirmBooking";
import Payment from "./pages/customer/Payment";

// ✅ Layout and route protection
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    loadUser(); // ✅ Restore user session on app start
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <MainLayout type="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
        </Route>

        {/* ✅ Staff Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={["staff"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/assigned"
          element={
            <ProtectedRoute roles={["staff"]}>
              <AssignedTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/history"
          element={
            <ProtectedRoute roles={["staff"]}>
              <WorkHistory />
            </ProtectedRoute>
          }
        />

        {/* ✅ Customer Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute roles={["customer"]}>
              <MainLayout type="customer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<BookRoom />} />
          <Route path="hall" element={<BookHall />} />
          <Route path="buffet" element={<BookBuffet />} />
          <Route path="history" element={<BookingHistory />} />
        </Route>

        {/* ✅ Full-page confirmation route */}
        <Route
          path="/customer/confirm-booking"
          element={
            <ProtectedRoute roles={["customer"]}>
              <ConfirmBooking />
            </ProtectedRoute>
          }
        />

        {/* ✅ Full-page payment route */}
        <Route
          path="/customer/payment"
          element={
            <ProtectedRoute roles={["customer"]}>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* 🔁 Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
