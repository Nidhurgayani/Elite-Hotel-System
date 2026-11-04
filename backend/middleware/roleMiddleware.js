// backend/middleware/roleMiddleware.js

exports.requireRole = (role) => {
  return (req, res, next) => {
    // Ensure user object exists (set by verifyToken middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: no user information found",
      });
    }

    // Check role
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient privileges",
      });
    }

    // User has required role → continue
    next();
  };
};
