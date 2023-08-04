const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done){

    try{
        const user = await User.findById(jwtPayload._id);
        if(user){
            return done(null, user);
        }
        console.log("User doesn't found")
        return done(null, false);
    }
    catch(err){
        console.log(err);
        return 
    }
}))




module.exports = passport;