// backend/api/staff/staff.routes.js
const express = require("express");
const router = express.Router();
const {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} = require("./staff.controller");

const { verifyToken } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

// Public: any authenticated user can view staff
router.get("/", verifyToken, getStaff);

// Admin-only: only admins can manage staff
router.post("/", verifyToken, requireRole("admin"), createStaff);
router.put("/:id", verifyToken, requireRole("admin"), updateStaff);
router.delete("/:id", verifyToken, requireRole("admin"), deleteStaff);

module.exports = router;
