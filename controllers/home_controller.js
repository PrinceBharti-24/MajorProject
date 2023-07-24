const Post = require('../models/post');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    // res.cookie('newCookie', 'i have set it')
    try{
        // populate the user for all the post
        const posts = await Post.find({}).populate('user')
        .populate({
            path: 'comment',
            populate : {
                path: 'user'
            }
        })
        .exec();
        return res.render('home', {
            title: 'Home',
            posts: posts
        })
    }
    catch(err){
        console.log('error in fetching frome the database', err);
    }
}