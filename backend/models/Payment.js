const db = require("../config/db");

const Payment = {
  create: async (data) => {
    const { name, cardNumber, expiry, cvc, zip, amount, room } = data;

    const query = `
      INSERT INTO payments (name, card_number, expiry, cvc, zip, amount, room)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [name, cardNumber, expiry, cvc, zip, amount, room];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

module.exports = Payment;