require('dotenv').config()
const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: async (email) => {
        console.log(process.env.GMAIL_USER)
        console.log(process.env.GMAIL_PWD)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail', // no need to set host or port etc.
            auth: {
                user: process.env['GMAIL_USER'],
                pass: process.env['GMAIL_PWD']
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Mighty JAXX 👻" <nodemailer8838@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Welcome, new user sign-up", // plain text body
            html: "<b>Welcome new user</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    }
}