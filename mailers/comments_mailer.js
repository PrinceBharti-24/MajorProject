const nodemailer = require('../config/nodemailer');

module.exports.newComment = (comment)=> {
    // console.log("inside new comment mailer");
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from: 'MajorProject@gmail.in',
        to: comment.user.email,
        subject: "New comment Published",
        html: htmlString
    }, (err, info) =>{
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('message sent', info);
        return;
    })
}