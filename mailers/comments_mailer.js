const nodemailer = require('../config/nodemailer');

module.exports.newComment = (comment)=> {
    console.log("inside new comment mailer");

    nodemailer.transporter.sendMail({
        from: 'MajorProject@gmail.in',
        to: comment.user.email,
        subject: "New comment Published",
        html: '<h1> Your Comment is now pulbished </h1>'
    }, (err, info) =>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('message sent', info);
        return;
    })
}