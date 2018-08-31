var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djangelopoku@gmail.com',
        pass: '0kp0ku0n'
    }
});

exports.recoveryPassword = function(email,callback,pass){
    let mailOptions = {
        from: '"Chota"',
        to: email,
        subject: ' Chota Password Recovery',
        html: `<center><h2> <p>You have requested a password reset,<br> please use the number below to login and reset your password.</p></h2><center>
                <br><br><h3><span style="color:rgba(4, 5, 17, 1); background-color:rgba(141, 173, 231, 1); padding: 20px; 
                border-radius: 20px; font-weight: bold; border-radius: 5px; border: 1px solid rgba(4, 5, 17, 1)">
                <a href='http://localhost:5000/auth/recover?email=${email}&token=${pass}'>Confirm your password</a></span></h3>`
 };
 transporter.sendMail(mailOptions, callback);
}