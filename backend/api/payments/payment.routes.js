const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("./payment.controller");

// Payment routes
router.get("/", getPayments);        // GET all payments
router.post("/", createPayment);     // POST create a new payment
router.put("/:id", updatePayment);   // PUT update payment by ID
router.delete("/:id", deletePayment); // DELETE payment by ID

module.exports = router;
