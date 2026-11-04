// backend/controllers/task.controller.js
const db = require("../../config/db");

// ✅ Assign a new task (Admin only)
exports.assignTask = async (req, res) => {
  const { title, description, assignedTo, category, priority, dueDate } = req.body;

  // Validate required fields
  if (!title || !description || !assignedTo || !category || !priority || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO tasks (title, description, assigned_to, category, priority, due_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, assignedTo, category, priority, dueDate, "Pending"]
    );

    return res.status(201).json({ success: true, task: result.rows[0] });
  } catch (err) {
    console.error("❌ Assign task error:", err); // log full error object
    return res.status(500).json({
      success: false,
      message: "Task assignment failed",
      error: err.message, // ✅ include error message in response for debugging
    });
  }
};

// ✅ Get all tasks (Any authenticated user)
exports.getTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY due_date ASC");
    return res.json({ success: true, tasks: result.rows });
  } catch (err) {
    console.error("❌ Get tasks error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error: err.message,
    });
  }
};

// ✅ Update task status (Any authenticated user)
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required",
    });
  }

  try {
    const result = await db.query(
      "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({ success: true, task: result.rows[0] });
  } catch (err) {
    console.error("❌ Update task error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: err.message,
    });
  }
};

// ✅ Delete task (Admin only)
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Delete task error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: err.message,
    });
  }
};
