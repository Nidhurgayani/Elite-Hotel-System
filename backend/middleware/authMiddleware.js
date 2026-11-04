// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Expect header format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    // Verify token using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded payload (user info) to request
    req.user = decoded;

    next(); // Continue to controller
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

