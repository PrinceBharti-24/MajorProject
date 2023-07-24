const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('back');
    }
    catch(err){
        console.log('error in creating the post', err);
        return;
    }
}

module.exports.destroyPost = async function(req, res) {
    try {
      // Find the post by ID and delete it
      const post = await Post.findByIdAndDelete(req.params.id);
  
      // If post not found or deleted successfully, redirect back
      if (!post) {
        return res.redirect('back');
      }
  
      // Also, delete the associated comments of the post
      await Comment.deleteMany({ post: req.params.id });
  
      // Redirect back to the previous page after successful deletion
      return res.redirect('back');
    } catch (err) {
      console.log('Error while deleting post:', err);
      return res.redirect('back');
    }
  };