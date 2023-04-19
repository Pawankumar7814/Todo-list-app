const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/userController');

router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/addUser', userController.addUser);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);


module.exports = router;