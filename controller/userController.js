const mongoose = require('../config/mongoose');
const User = require('../model/user');

module.exports.signup = function(req, res) {
    return res.status(200).render('signup', { title: "Sign up" });
}
module.exports.signin = function(req, res) {
    return res.status(200).render('signin', { title: "Sign in" });
}

module.exports.addUser = async function(req, res) {

    var userData = {
        name: req.body.uname,
        email: req.body.uemail,
        password: req.body.upass
    };
    console.log(userData);

    try {
        if (userData.upass == userData.c_upass) {
            var user = User.create({
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            console.log(`User Created Successfully`);
            return res.redirect('/users/signin');
        }
    } catch (err) {
        console.log(`Error while creating the user ${err}`);
    }
}