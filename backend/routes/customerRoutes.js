const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customerController');

// 🔐 Auth routes
router.post('/register', register);
router.post('/login', login);

// 👤 Customer management routes
router.post('/', createCustomer); // Add customer
router.get('/', getAllCustomers); // Get all customers
router.get('/:id', getCustomerById); // Get single customer
router.put('/:id', updateCustomer); // Update customer
router.delete('/:id', deleteCustomer); // Delete customer

module.exports = router;

