const jwt = require('jsonwebtoken');
const JWT_SECRET = '11422';

const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];
     
       if (!token) return res.status(403).json({ error: 'No token provided' });
     
       // Extract token from 'Bearer <token>'
       const tokenWithoutBearer = token.split(' ')[1]; // Token without the 'Bearer' prefix
     console.log('tokenWithoutBearer',tokenWithoutBearer);
     console.log('JWT_SECRET',JWT_SECRET);
     
     
       jwt.verify(tokenWithoutBearer.trim(), JWT_SECRET, (err, decoded) => {
         if (err) return res.status(401).json({ error: 'Invalid token' });
     
         req.user = decoded;  // Store decoded user info
         next();
       });
};

module.exports = verifyToken;
