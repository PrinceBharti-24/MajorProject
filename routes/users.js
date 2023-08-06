const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);

router.post('/update/:id', passport.checkAuthentication, userController.update);

router.post('/Create', userController.Create);

router.get('/sign-up', userController.signUp);

router.get('/sign-in', userController.signIn);

router.get('/sign-out', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

// Use passport as a middleware and make a router having 3 arguments including the middleware
router.post('/Create-Session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , userController.createSession);

module.exports = router;