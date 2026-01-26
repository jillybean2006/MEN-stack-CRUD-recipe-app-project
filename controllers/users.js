const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



async function index(req, res) {
  try {
    const users = await User.find({});
    res.render('index.ejs', {users});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate('pantry');
    res.render('show.ejs', { user });
  } catch (error) { console.log(error);
    res.redirect('/');
  }
}

router.get('/',index)
router.get('/:userId',show)


module.exports = router;




