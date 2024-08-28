const ValidPassword = (password) =>{
    const minLength = 8;
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return  password.length >= minLength && hasLowercase && hasUppercase && hasDigit && hasSymbol;
    
}
module.exports = ValidPassword;