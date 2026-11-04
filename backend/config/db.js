const { Pool } = require("pg");
require("dotenv").config();

// ✅ Create PostgreSQL connection pool using .env variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// ✅ Optional: Test connection on startup
pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ PostgreSQL connected at:", res.rows[0].now);
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection error:", err.message);
  });

// ✅ Export query method for use in controllers/models
module.exports = {
  query: (text, params) => pool.query(text, params),
};
