const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        // Save the user ID from the token into the request for later use
        req.userId = decoded.id;
        next(); // This tells Express to move to the next function!
    });
}

module.exports = verifyToken;
