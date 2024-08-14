const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log(auth)

    if (!auth) {
        return res.status(403).json({
            message: "Unauthorized, JWT token is required"
        });
    }

     // Extract the token from the "Bearer <token>" format

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user) // Attach the decoded user info to the request object
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized, JWT token is invalid or expired"
        });
    }
};

module.exports = ensureAuthenticated;