const express = require("express");
const router = express.Router();

// ✅ Corrected path to authController
const { registerUser, loginUser } = require("../../controllers/authController");

// ✅ Import customer controller
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../../controllers/customerController");

// 🔐 Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 👤 Customer management routes
router.post("/", createCustomer); // Add customer
router.get("/", getAllCustomers); // Get all customers
router.get("/:id", getCustomerById); // Get single customer
router.put("/:id", updateCustomer); // Update customer
router.delete("/:id", deleteCustomer); // Delete customer

module.exports = router;
