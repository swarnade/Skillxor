const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const id = verified.id;
        req.id = id;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};