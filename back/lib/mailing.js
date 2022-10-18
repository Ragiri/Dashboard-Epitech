//
// ─── IMPORTS ─────────────────────────────────────────────────────────────────
//

// npm modules
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var conf = require('./conf');
//
// ─── METADATAS ───────────────────────────────────────────────────────────────
//

let ConfirmationMail = () => 
        "<p>🇫🇷 Bonjour,<br>\
        Nous vous confirmont votre inscription sur le site Epitech Dashboard.\
        <br>Merci de votre inscription<br>\
        <span>Epitech Dashboard</span><br>\
        <em>Inscription gratuite</em></p>"

//
// ─── MAILING MODULE ──────────────────────────────────────────────────────────
//

mailing = {}

mailing.sendConfirmationMail = async (email) => {
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',// upgrade later with STARTTLS
            auth: {
                user: 'angelinalaure22@gmail.com',
                pass: conf.gpass,
            }
        }));
        var mailOptions = {
          from: 'angelinalaure22@gmail.com', // sender address
          to: email, // list of receivers
          subject: "[Epitech Dashboard] Confirmation de la creation de votre compte", // Subject line
          text: "Nous vous confirmont votre inscription sur le site Epitech Dashboard.", // plain text body
          html: "<b>Nous vous confirmont votre inscription sur le site Epitech Dashboard.</b>", // html body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
}

module.exports = mailing