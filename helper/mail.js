const nodemailer = require("nodemailer");
module.exports = (emailTo, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "loeby45@gmail.com",
            pass: "1235732159"
        }
    });

    let HelperOptions = {
        from: "loeby45@gmail.com",
        to: emailTo,
        subject: 'test',
        html: text
    }

    transporter.sendMail(HelperOptions, (err, info) => {
        if (err) {
            return console.log(err)
        } else {
            console.log('berhasil')
            console.log(info)
        }
    })
}