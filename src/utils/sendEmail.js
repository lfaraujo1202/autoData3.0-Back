const nodemailer = require("nodemailer");
require('dotenv').config()
const HOST = process.env.HOST;
const SERVICE = process.env.SERVICE;
const USER = process.env.USER;
const PASS = process.env.PASS;
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const sendEmail = async (email, subject, text) => {
    try {
        var transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'ab36063887b21d',
                pass: 'aa1ad5807f5d3e',
            },
        });

        // transport.use('compile', hbs({
        //     viewEngine: 'handlebars',
        //     viewPath: path.resolve('./src/resources/mail/'),
        //     extName: '.html',
        // }))

        await transporter.sendMail({
            from: "luizfelipe@msn.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
