const User = require('../models/users');

module.exports.profile = async function(req, res){
    const user = await User.findById(req.params.id);

    return res.render('usersProfile',{
        profile_user : user,
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
    req.flash('success', "Logged In successfully");
    return res.redirect('/');
}

// destroy a session

module.exports.destroySession = function(req, res, next){

    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "You have been logged out");
        res.redirect('/');
      });

}

// Update the User's Profile 


module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('back');
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}