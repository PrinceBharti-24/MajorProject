const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      if (comment) {
        post.comment.push(comment);
        post.save();

        res.redirect("/");
      }
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
        await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});
        return res.redirect('back')
        console.log('getting in this if block')
    }
  }
  catch(err){
    console.log('error in deleting the comment', err);
  }
}