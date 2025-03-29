// // middleware/auth.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   // Get token from Authorization header (with Bearer scheme)
//   const token = req.header('Authorization')?.replace('Bearer ', '');  // Remove 'Bearer ' part

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;  // Attach user ID directly to the request (no nested "user" object)
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Ensure req.user contains the full decoded object
//     console.log('Authenticated user ID:', req.user.id); // Debugging log
//     next();
//   } catch (err) {
//     console.error('JWT Verification Error:', err);
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('Middleware executing...'); // NEW DEBUG LOG

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.log('No token found'); // DEBUG
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure req.user contains the full decoded object
    console.log('Authenticated user ID:', req.user.id); // Debugging log
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// ✅ Export after defining the function
module.exports = authMiddleware;




