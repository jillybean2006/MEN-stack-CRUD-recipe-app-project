const express = require('express');
const createError = require('http-errors');
const session =require('express-session');
const passport = require ('passport');
const localStrategy = require('passport-local').strategy;
const crypto = require('crypto');
const MongoStore = require('connect-mongo');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./modles/User');


connectDB();



const indexRouter = require('./routes/index');

require('dotenv').config();



let app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));


app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');



passport.use(
    new localStrategy(function (username, password, cb) {
        User.findOne({ username: username })
    .then((user) => {
        if (!user) {
            return cb(null, false);
        }
        const isValid = validPassword(password, user.hash, user.salt);
        if (isValid) {
         return cb(null, user);
        } else {
            return cb(null, false);
        } 
    })
    .catch((err) => {
        cb(err);
    });
})
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});



passport.deserializeUser(async function (id, cb) {

try {
    const user = await User.findbyId(id);
    cb(null, user);
} catch (err) {
    return cb(err);
}
});

app.use(
session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        stringify: false,
    }),

    cookie: {

        maxAge: 1000 * 60 * 60 * 24, 
    },
})
);


app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);

app.use(function (req, res, next) {
next(createError(404));
});


app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);



function validPassword(password, hash, salt) {
let hashVerify = crypto.pbkdf2sync(password, salt, 10000, 64, 'sha512').toString('hex');
return hash === hashVerify;