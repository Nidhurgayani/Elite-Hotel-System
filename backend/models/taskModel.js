const db = require("../config/db");

exports.getAllTasks = async () => {
  const result = await db.query("SELECT * FROM tasks ORDER BY due_date ASC");
  return result.rows;
};

exports.createTask = async (task) => {
  const { title, description, assignedTo, category, priority, dueDate, status } = task;
  const result = await db.query(
    `INSERT INTO tasks (title, description, assigned_to, category, priority, due_date, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, description, assignedTo, category, priority, dueDate, status]
  );
  return result.rows[0];
};

exports.updateTask = async (id, patch) => {
  const fields = Object.keys(patch);
  const values = Object.values(patch);
  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");

  const result = await db.query(
    `UPDATE tasks SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

exports.deleteTask = async (id) => {
  await db.query("DELETE FROM tasks WHERE id = $1", [id]);
}; 