const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/likes');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        if(req.xhr){
          post = await post.populate('user', 'name')
          return res.status(200).json({
            data: {
              post: post
            },
            message: "Post created"
          })
        }
        req.flash('success', "Post created successfully");
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

      await Like.deleteMany({likeable: post, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comment}});
  
      // If post not found or deleted successfully, redirect back
      if (!post) {
        return res.redirect('back');
      }

      if(req.xhr){
        console.log('yes i am in')
        return res.status(200).json({
          data: {
            post_id: req.params.id
          },
          message: "Post deleted"
        })
      }
  
      // Also, delete the associated comments of the post
      req.flash('success', "Post deleted")
      await Comment.deleteMany({ post: req.params.id });
  
      // Redirect back to the previous page after successful deletion
      return res.redirect('back');
    } catch (err) {
      console.log('Error while deleting post:', err);
      return res.redirect('back');
    }
  };