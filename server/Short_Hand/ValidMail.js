
const ValidMail = (email) => {
    const a = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return a.test(email);
}
module.exports = ValidMail;