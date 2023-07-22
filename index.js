const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// for session cookies
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');

// using mongo store for storage of cookie even after server restarts
const MongoStore = require('connect-mongo');

app.use(express.static('./assets'));

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set up the layout for script and style so that it will automatically set in the head and body respectively
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine

app.set('view engine', 'ejs');
app.set('views' , './views');

// Use the middleware to make changes like encryption and decryption in cookie
app.use(session({
    name: 'MajorProject',
    // TODO secret encryption later
    secret:'somethingsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*10)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://127.0.0.1:27017/test-app',
        autoRemove: 'disabled',
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router

app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    else{
        console.log(`Running succeesfully on port: ${port}`);
    }
})