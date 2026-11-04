const express = require("express");
const router = express.Router();
const {
  assignTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("./task.controller");

const { verifyToken } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

router.post("/assign", verifyToken, requireRole("admin"), assignTask);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, requireRole("admin"), deleteTask);

module.exports = router;
