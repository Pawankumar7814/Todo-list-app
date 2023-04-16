const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');


// Authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'email'
    },

    function(email, password, done) {
        // Find a user and establish the identity
        User.findOne({ email: email }, function(err, user) {
            if (err) { console.log(`Error in finding the user ${err}`); return done(err); }
            if (!user || user.password != password) {
                console.log(`Invalid username/password`);
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
});


// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log(`Error in finding the user`);
            return done(err);
        }
        return done(null, user);
    });
});