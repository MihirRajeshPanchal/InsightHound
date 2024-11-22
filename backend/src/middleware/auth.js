import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from '../lib/constants.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Middleware to check authentication based on JWT token in cookies
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;