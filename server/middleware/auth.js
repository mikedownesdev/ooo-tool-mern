const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // Get token from the headers
    const token = req.header('authorization');

    // Check if token exists
    if (!token) {
        console.error('No token was sent, authorization denied');
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Set user in request object
        req.user = decoded.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
};

module.exports = authMiddleware;
