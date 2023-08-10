const nodemailer = require('nodemailer');

module.exports.newComment = (comment) => {
    console.log('Inside new Comment mailer');

    nodemailer.transporter.sendMail({
        from: 'project@gmail.com',
        to: comment.user.email,
        subject: 'new Comment Published',
        html: '<h1>Your Comment is now published</h1>'

    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('mail deliverd', info);
        return;
    })
}