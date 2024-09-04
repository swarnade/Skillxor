
require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET; 

function createToken(payload) {
    const options = {
        expiresIn: '24h',
        issuer: 'SIH2024',
    };
    return jwt.sign(payload, secretKey, options);;
}
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken
};
