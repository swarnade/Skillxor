
const ValidMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile)
}

module.exports = ValidMobile;