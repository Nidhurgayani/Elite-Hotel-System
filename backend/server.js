// ✅ Load environment variables from .env file
require("dotenv").config();

// ✅ Import Express app and database connection
const app = require("./app");
const db = require("./config/db");

// ✅ Define the port
const PORT = process.env.PORT || 5000;

// ✅ Start the server after confirming DB connection
(async () => {
  try {
    // Test DB connection
    await db.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL database");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to the database:", err.message);
    process.exit(1); // Exit process with failure
  }
})();
