const db = require("../config/db");

const Hall = {
  // 📄 Find a hall by ID
  async findById(id) {
    const res = await db.query(
      "SELECT * FROM halls WHERE id = $1",
      [id]
    );
    return res.rows[0];
  },

  // ➕ Create a new hall
  async create(data) {
    const { title, capacity, pricePerGuest, status = "Available" } = data;
    const res = await db.query(
      `INSERT INTO halls (title, capacity, price_per_guest, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [title, capacity, pricePerGuest, status]
    );
    return res.rows[0];
  },

  // 📋 Get all halls
  async getAll() {
    const res = await db.query(
      "SELECT * FROM halls ORDER BY created_at DESC"
    );
    return res.rows;
  },

  // 🛠️ Update hall status
  async updateStatus(id, status) {
    const res = await db.query(
      "UPDATE halls SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return res.rows[0];
  }
};

module.exports = Hall;
next