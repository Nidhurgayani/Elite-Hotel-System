const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware"); // Optional: enable later if needed

// ==============================
// 📦 Booking Routes
// ==============================

// @route   POST /api/bookings
// @desc    Create a new booking (Buffet, Room, or Hall)
// @access  Protected (optional)
router.post("/", /* protect, */ bookingController.createBooking);

// @route   GET /api/bookings/user/:userId
// @desc    Get all bookings for a specific user
// @access  Protected (optional)
router.get("/user/:userId", /* protect, */ bookingController.getBookingsByUser);

// @route   GET /api/bookings/:id
// @desc    Get a single booking by ID
// @access  Protected (optional)
router.get("/:id", /* protect, */ bookingController.getBookingById);

// @route   DELETE /api/bookings/:id
// @desc    Cancel (soft delete) a booking by ID
// @access  Protected (optional)
router.delete("/:id", /* protect, */ bookingController.cancelBooking);

module.exports = router;
