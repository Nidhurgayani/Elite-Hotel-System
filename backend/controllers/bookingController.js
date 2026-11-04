const Booking = require("../models/Booking");
const Hall = require("../models/Hall");
const Buffet = require("../models/Buffet");

// ==============================
// 📦 Booking Controller
// ==============================

// @desc    Create a new booking (Room, Hall, or Buffet)
// @route   POST /api/bookings
// @access  Public or Protected
exports.createBooking = async (req, res) => {
  try {
    const {
      type,               // "Room", "Hall", "Buffet"
      title,
      price,
      guests = 1,
      eventDate = null,
      checkIn = null,
      checkOut = null,
      requests = null,
      dietary = null,
      userId = req.user?.id || req.body.userId,
      status = "confirmed",
      total,
      room = null,
      hall = null,
      buffet = null,
      pricePerGuest = null,
      buffetType = null,
    } = req.body;

    if (!type || !title || !price || !userId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: type, title, price, or userId.",
      });
    }

    // Optional: validate hall or buffet availability
    if (type === "Hall" && hall) {
      const hallData = await Hall.getById(hall); // Adjust to your Hall model
      if (!hallData || hallData.status !== "Available") {
        return res.status(400).json({ success: false, error: "Hall not available" });
      }
    }

    if (type === "Buffet" && buffetType) {
      const buffetData = await Buffet.getByType(buffetType); // Adjust to your Buffet model
      if (!buffetData || buffetData.status !== "Available") {
        return res.status(400).json({ success: false, error: "Buffet not available" });
      }
    }

    const computedTotal = total ?? price;

    const bookingData = {
      type,
      title,
      price,
      guests,
      eventDate,
      checkIn,
      checkOut,
      requests,
      dietary,
      userId,
      status,
      total: computedTotal,
      room,
      hall,
      buffet,
      pricePerGuest,
      buffetType,
    };

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ success: false, error: "Failed to save booking" });
  }
};

// @desc    Get all bookings for a specific user
// @route   GET /api/bookings/user/:userId
exports.getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.getAllByUser(userId);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
};

// @desc    Get a single booking by ID
// @route   GET /api/bookings/:id
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.getById(id);
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ success: false, error: "Failed to fetch booking" });
  }
};

// @desc    Cancel a booking by ID
// @route   DELETE /api/bookings/:id
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.cancel(id);
    if (!booking) {
      return res.status(404).json({ success: false, error: "Booking not found or already cancelled" });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ success: false, error: "Failed to cancel booking" });
  }
};
