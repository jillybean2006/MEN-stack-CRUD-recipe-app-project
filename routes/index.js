const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/user');



router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/protected-router');
    } else {
        res.send( 'Welcome to the Home Page! Please log in or register.' );
    }
});



router.get('/login', (req, res, next) => {
    const form =
   '<h1>Login</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
});


router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login-failure',
        successRedirect: 'login-success',
    }),
    (err, req, res, next) => {
        if (err) next(err);
    }
);


router.get('/register', (req, res, next) => {
    const form =
    '<h1>Register</h1><form method="post" action="register">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit"></form>';
    res.send(form);

});


router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
    });


newUser.save().then((user) => 
});

res.redirect('/login');


router.get('/protected-route', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><form action="/logout" method="POST"><button style="width: 60px;
             height: 30px; font-size: 12px;" type="submit">Logout</button></form></p>);
    
            } else {
                res.send(
                    '<h1>You are not authenticated</h1><p>< a href="/login">Login</a> or <a href="/register">Register</a></p>'

                );
            }
        });

        router.post('/logout', (req, res, next) => {
            req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/protected-route');
    });
});


router.get('/login-success', (req, res, next) => {
    res.send(
        '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
    );
});

router.get('/login-failure', (req, res, next) => {
    res.send ('You entered the wrong password.');
});


function genPassword(password) {
let salt =crypto.randomBytes(32).toString('hex');
let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');


return {
    salt: salt,
    hash: genHash,
};

}

module.exports = router;

