const User = require('../models/users');

module.exports.profile = function(req, res){
    return res.render('usersProfile',{
        title: "User Profile"
    });
}

// rendering the signUp page

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Account'
    });
} 

// rendering the signIn page

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Account'
    });
    
} 

// get the signUp data

module.exports.Create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding/creating user while signing up', err);
        return res.redirect('back');
    }
};

// get the signIn and create a session for the user

module.exports.createSession = function(req, res){
    return res.redirect('/');
}