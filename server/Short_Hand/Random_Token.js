function Generate_Token() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&*()';
    let token = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        token += characters[randomIndex];
    }
    
    return token;
}
module.exports = Generate_Token;