const db = require("../config/db");

const Booking = {
  // ✅ Create a new booking
  create: async (data) => {
    const {
      type,
      status = "confirmed",
      checkIn = null,
      checkOut = null,
      eventDate = null,
      guests = 1,
      room = null,
      hall = null,
      buffet = null,
      requests = null,
      dietary = null,
      price = 0,
      total,
      userId,
      pricePerGuest = null,
      buffetType = null,
    } = data;

    // Validation
    if (!type || !userId) {
      throw new Error("Missing required fields: type or userId");
    }

    const query = `
      INSERT INTO bookings (
        type, status, check_in, check_out, event_date,
        guests, room, hall, buffet, requests, dietary,
        price, total, user_id, price_per_guest, buffet_type, created_at
      )
      VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, NOW()
      )
      RETURNING *;
    `;

    const values = [
      type,
      status,
      checkIn,
      checkOut,
      eventDate,
      guests,
      room,
      hall,
      buffet,
      requests,
      dietary,
      price,
      total ?? price, // fallback if total not provided
      userId,
      pricePerGuest,
      buffetType,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  // 📥 Get all bookings for a specific user
  getAllByUser: async (userId) => {
    const query = `
      SELECT * FROM bookings
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  },

  // 📄 Get a single booking by ID
  getById: async (bookingId) => {
    const query = `SELECT * FROM bookings WHERE id = $1;`;
    const result = await db.query(query, [bookingId]);
    return result.rows[0];
  },

  // ❌ Cancel a booking by ID (soft delete)
  cancel: async (bookingId) => {
    const query = `
      UPDATE bookings
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [bookingId]);
    return result.rows[0];
  },
};

module.exports = Booking;

