// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header (with Bearer scheme)
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Remove 'Bearer ' part

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;  // Attach user ID directly to the request (no nested "user" object)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
