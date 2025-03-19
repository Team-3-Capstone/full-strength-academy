const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '12345'; 

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer <token>

  // If no token is provided, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid or Expired Token' });
    }

    // Store the decoded token, the user info - in the request object 
    req.user = decoded;  // Attach the decoded user data to the request object
    next(); 
  });
};

module.exports = verifyToken;
