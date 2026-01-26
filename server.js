import dotenv from'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';

import isSignedIn from './middleware/is-signed-in.js';
import  passUserToView  from './middleware/pass-user-to-view.js';



import usersController from './controllers/users.js';
import recipesController  from './controllers/recipes.js';
import authController  from './controllers/auth.js';



const port = process.env.PORT ? process.env.PORT : '3000';

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);


mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);




app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);

app.use('/users', usersController);
app.use('/users/:userId/foods',recipesController)






app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});