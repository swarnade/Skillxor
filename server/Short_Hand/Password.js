
const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}
function verifyPassword(inputPassword, hashedPassword) {
    const hashedInput = hashPassword(inputPassword);
    return hashedInput === hashedPassword;
}

module.exports = {
    hashPassword: hashPassword,
    verifyPassword: verifyPassword,
};
