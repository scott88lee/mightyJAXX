const Users = require('../models/users');

const listAll = async (req, res) => {
    let result = await Users.getAll();
    res.json(result);
}

const createNew = async (req, res) => {
    const v = require('../helpers/validators');
    let body = req.body;

    if (!v.emailValidation(body.email)) {
        res.json({ Success: false, Message: 'Invalid email' });
        return;
    }
    if (!v.passwordLength(body.password)) {
        res.json({ Success: false, Message: 'Password must be at least 8 characters long' });
        return;
    }
    if (!v.passwordCombination(body.password)) {
        res.json({ Success: false, Message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' });
        return;
    }

    const nodemailer = require("nodemailer");

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
        from: '"Mighty JAXX 👻" <foo@example.com>', // sender address
        to: "scott88lee@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('Ok');
}

//Delete user
const deleteUser = async (req, res) => {
    let body = req.body;
    console.log(req.body);
    let result = await Users.getAll();
    res.json(result);
}

module.exports = {
    listAll,
    createNew,
}