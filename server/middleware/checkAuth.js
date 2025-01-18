const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const jwtAuth = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Attach user info (e.g., user ID) to the request object
        req.user = decoded;
        
        next(); // Pass control to the next middleware
    } catch (err) {
        // Handle invalid or expired tokens
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = jwtAuth;
