const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  department: String,
  totalBookings: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
});

module.exports = mongoose.model("Customer", customerSchema);