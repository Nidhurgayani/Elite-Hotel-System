const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("./booking.controller");

// Booking routes
router.get("/", getBookings);        // GET all bookings
router.post("/", createBooking);     // POST create a new booking
router.put("/:id", updateBooking);   // PUT update booking by ID
router.delete("/:id", deleteBooking); // DELETE booking by ID

module.exports = router;
