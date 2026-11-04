const db = require("../../config/db");

// GET all payments
exports.getPayments = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM payments");
    res.json({ success: true, payments: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE a payment
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, amount, method, status, paidAt } = req.body;

    const result = await db.query(
      `INSERT INTO payments (booking_id, amount, method, status, paid_at)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [bookingId, amount, method, status, paidAt]
    );

    res.status(201).json({ success: true, payment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE a payment
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingId, amount, method, status, paidAt } = req.body;

    const result = await db.query(
      `UPDATE payments
       SET booking_id=$1, amount=$2, method=$3, status=$4, paid_at=$5
       WHERE id=$6 RETURNING *`,
      [bookingId, amount, method, status, paidAt, id]
    );

    res.json({ success: true, payment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE a payment
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM payments WHERE id=$1", [id]);
    res.json({ success: true, message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
