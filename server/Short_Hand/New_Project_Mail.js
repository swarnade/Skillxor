require('dotenv').config();
const nodemailer = require('nodemailer');
// "to" - The mail should be one of our mail as because only bcc without using the "to" will not be sent

// Emails - The list of emails to which the mail should be sent, it should be an array of emails

// subject - The subject of the mail

// text - The text of the mail
async function New_Project_Mail(to, Emails, subject, text) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MailServer,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        let mailOptions = {
            from: process.env.EMAIL,
            to: to,
            bcc: Emails,
            subject: subject,
            text: text
        };
        await transporter.sendMail(mailOptions,e=>{
            if(e){
                return null;
            }
        });
        return true;
    } catch {
        return null;
    }   
}
module.exports = New_Project_Mail;