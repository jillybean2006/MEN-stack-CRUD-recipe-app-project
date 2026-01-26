const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSighnedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');



const usersController = require('./controllers/users');
const foodsController = require('./controllers/foods');
const authController = require('./controllers/auth')



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
app.use(isSighnedIn);

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