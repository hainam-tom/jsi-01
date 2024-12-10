const admin = require('../config/firebaseConfig');

// Middleware to check if the user is authenticated and has the required role
const authMiddleware = (requiredRoles = []) => {
  return async (req, res, next) => {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const idToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // Check if token is provided
    if (!idToken) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; // Attach user information to the request object

      // Check if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(decodedToken.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      console.log(`User  authenticated: ${decodedToken.email} with role: ${decodedToken.role}`); // Log the authenticated user
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = authMiddleware;