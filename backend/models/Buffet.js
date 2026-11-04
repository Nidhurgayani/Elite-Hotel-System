const db = require("../config/db");

const Buffet = {
  // 📄 Find a buffet by type
  async findOne({ type }) {
    const result = await db.query(
      "SELECT * FROM buffets WHERE type = $1 LIMIT 1",
      [type]
    );
    return result.rows[0];
  },

  // 📋 Get all buffets
  async getAll() {
    const result = await db.query(
      "SELECT * FROM buffets ORDER BY created_at DESC"
    );
    return result.rows;
  },

  // ➕ Create a new buffet
  async create(data) {
    const { type, price, status = "Available", description = null } = data;
    const result = await db.query(
      `INSERT INTO buffets (type, price, status, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [type, price, status, description]
    );
    return result.rows[0];
  },

  // 🛠️ Update buffet status
  async updateStatus(id, status) {
    const result = await db.query(
      "UPDATE buffets SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  }
};

module.exports = Buffet;
