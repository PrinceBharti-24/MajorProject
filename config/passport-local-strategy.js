const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, 
// callback funciton to check the user and password in the database
async function(email, password, done){
    try{
        const user = await User.findOne({email: email});
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user); 
    }
    catch(err){
        console.log('error in finding the user from the database', err);
        return done(err);
    }
}));

// Now , the next step is to serialize and deserialize the user

// Serialize the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserialize the user

passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log('Error in finding the user from the database', err);
      return done(err);
    }
  });

//   check if the user is authenticated by creating a middleware
passport.checkAuthentication = function(req, res ,next){
    // if the user is signed in then pass the information
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in then send user to sign-in page
    res.redirect('/users/sign-in');
}

// now set the authentication

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user's information so pass them to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

// the final step is to export the passport
module.exports = passport;