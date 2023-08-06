const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passport.use(new googleStrategy({
    clientID: "952915921424-dfcl1m0vc2nd670u1e928flfo0uo44lg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken , refreshToken , profile, done){
        try{
            let user = await User.findOne({email: profile.emails[0].value}).exec();
            console.log(profile);
            if(user){
                return done(null, user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("error in creating user", err);
                        return;
                    }
                    return done(null, user);
                })
            }
        }
        catch(err){
            console.log("error in finding the user", err);
            return;
        }
    }
))