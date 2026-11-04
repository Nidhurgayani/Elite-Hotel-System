const db = require("../config/db"); // your PostgreSQL pool

// ✅ Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, department } = req.body;

    if (!name || !email || !password || !phone || !department) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const result = await db.query(
      `INSERT INTO customers (name, email, password, phone, department)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, password, phone, department]
    );

    res.status(201).json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error("❌ Create customer error:", err.message);
    res.status(500).json({ success: false, error: "Failed to create customer" });
  }
};

// ✅ Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers ORDER BY customer_id ASC");
    res.status(200).json({ success: true, customers: result.rows });
  } catch (err) {
    console.error("❌ Fetch customers error:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch customers" });
  }
};

// ✅ Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customers WHERE customer_id = $1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error("❌ Get customer error:", err.message);
    res.status(500).json({ success: false, error: "Failed to get customer" });
  }
};

// ✅ Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, password, phone, department } = req.body;

    const result = await db.query(
      `UPDATE customers
       SET name = $1, email = $2, password = $3, phone = $4, department = $5
       WHERE customer_id = $6
       RETURNING *`,
      [name, email, password, phone, department, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, customer: result.rows[0] });
  } catch (err) {
    console.error("❌ Update customer error:", err.message);
    res.status(500).json({ success: false, error: "Failed to update customer" });
  }
};

// ✅ Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM customers WHERE customer_id = $1 RETURNING *", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: "Customer not found" });
    }

    res.status(200).json({ success: true, message: "Customer deleted" });
  } catch (err) {
    console.error("❌ Delete customer error:", err.message);
    res.status(500).json({ success: false, error: "Failed to delete customer" });
  }
};
