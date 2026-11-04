const express = require("express");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies and auth headers
  })
);
app.use(express.json()); // Parse JSON request bodies

// Optional: Request logging (enable if needed)
// const morgan = require("morgan");
// app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/auth", require("./api/auth/auth.routes"));
app.use("/api/customers", require("./api/customers/customer.routes"));
app.use("/api/staff", require("./api/staff/staff.routes"));
app.use("/api/bookings", require("./api/bookings/booking.routes"));
app.use("/api/tasks", require("./api/tasks/task.routes"));
app.use("/api/payments", require("./api/payments/payment.routes"));

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Elite Hotel API is running ✅" });
});

// ❌ 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ❗ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

module.exports = app;

