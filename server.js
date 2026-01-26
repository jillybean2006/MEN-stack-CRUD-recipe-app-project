import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import morgan from 'morgan';
import session from 'express-session';

import isSignedIn from './middleware/is-signed-in.js';
import passUserToView from './middleware/pass-user-to-view.js';



import usersController from './controllers/users.js';
import foodsController from './controllers/foods.js';
import authController from './controllers/auth.js';

import path from 'path';
import { fileURLToPath } from 'url';
import router from './controllers/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



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

app.use('/users',usersController)
app.use('/users/:userId/foods',foodsController)



app.get('/', async(req, res) => {
  const User = require('./models/user')
try {
  const users = await User.find({})
 res.render('index.ejs', {
  users });
}catch(error){
  console.log(error)
  res.render('index.ejs',{users:[]})
}});


app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});


export default router;