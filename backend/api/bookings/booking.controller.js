const db = require("../../config/db");

// GET all bookings
exports.getBookings = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM bookings");
    res.json({ success: true, bookings: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE a booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, roomType, checkIn, checkOut, guests, status, notes } = req.body;

    const result = await db.query(
      `INSERT INTO bookings (customer_id, room_type, check_in, check_out, guests, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [customerId, roomType, checkIn, checkOut, guests, status, notes]
    );

    res.status(201).json({ success: true, booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE a booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, roomType, checkIn, checkOut, guests, status, notes } = req.body;

    const result = await db.query(
      `UPDATE bookings
       SET customer_id=$1, room_type=$2, check_in=$3, check_out=$4, guests=$5, status=$6, notes=$7
       WHERE id=$8 RETURNING *`,
      [customerId, roomType, checkIn, checkOut, guests, status, notes, id]
    );

    res.json({ success: true, booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE a booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM bookings WHERE id=$1", [id]);
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
