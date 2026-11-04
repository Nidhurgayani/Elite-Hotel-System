const db = require("../../config/db");

// ✅ Get all staff
exports.getStaff = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM staff");
    res.json({ success: true, staff: result.rows });
  } catch (err) {
    console.error("Get staff error:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch staff" });
  }
};

// ✅ Create staff
exports.createStaff = async (req, res) => {
  try {
    const { name, email, role, phone, department } = req.body;

    const result = await db.query(
      "INSERT INTO staff (name, email, role, phone, department) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, role, phone, department]
    );

    res.status(201).json({ success: true, staff: result.rows[0] });
  } catch (err) {
    console.error("Create staff error:", err.message);
    res.status(500).json({ success: false, message: "Failed to create staff" });
  }
};

// ✅ Update staff
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, phone, department } = req.body;

    const result = await db.query(
      "UPDATE staff SET name=$1, email=$2, role=$3, phone=$4, department=$5 WHERE id=$6 RETURNING *",
      [name, email, role, phone, department, id]
    );

    res.json({ success: true, staff: result.rows[0] });
  } catch (err) {
    console.error("Update staff error:", err.message);
    res.status(500).json({ success: false, message: "Failed to update staff" });
  }
};

// ✅ Delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM staff WHERE id=$1", [id]);
    res.json({ success: true, message: "Staff member deleted" });
  } catch (err) {
    console.error("Delete staff error:", err.message);
    res.status(500).json({ success: false, message: "Failed to delete staff" });
  }
};
