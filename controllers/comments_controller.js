const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/likes');

const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comment.push(comment);
      post.save();

      comment = await comment.populate('user', 'name email');
      // commentsMailer.newComment(comment);

      let job = queue.create('emails', comment).save(function(err){
        if(err){
          console.log('error in sending the mail using kue', err);
          return;
        }
        console.log('job enqueued', job.id);
      })

      if(req.xhr){
        
        return res.status(200).json({
          data: {
            comment: comment
          },
          message: "Comment Created Successfully"
        })
        
      }
      req.flash("success", "Comments created");
      
      res.redirect('/');
      
    } else {
      console.log("post does not exist");
      return;
    }
  } catch (err) {
    console.log("error in creating a comment", err);
  }
};


module.exports.destroy = async function(req, res){
  try{
    // Finding the Id of the Comment clicked using params.id and delete it and store the id in comment
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if(comment.user == req.user.id){
        let postId = comment.post;
        // Store the PostId to delete the comment from the post
        // for this use update method and pull the comment from it
        // This pull method is provided by mongoose to delete the comments from the comment array of the post 
        let post = await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
        return res.redirect('back')
        console.log('getting in this if block')
    }
  }
  catch(err){
    console.log('error in deleting the comment', err);
  }
}



