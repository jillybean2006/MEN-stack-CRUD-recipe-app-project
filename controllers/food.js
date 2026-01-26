const express = require('express');
const router = express.Router({mergeParams:true});

const User = require('../models/user.js');




router.get('/', async function(req, res) {
    const user = await User.findById(req.params.userId);
    console.log(user)
    res.render('foods/index.ejs', {user});
});

router.get('/new', function(req, res) {
    res.render('foods/new.ejs',{userId:req.params.userId});
});


router.post('/', async function(req, res) {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
  
});


router.delete('/:id', async function(req, res) {
  const user= await User.findById(req.params.userId)
  user.pantry.id(req.params.id).deleteOne()
 await user.save()
res.redirect(`/users/${req.params.userId}/foods`);
})




router.get('/:itemId/edit', async function (req, res) {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', { user, food });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

router.put('/:foodId', async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.foodId);
    food.name = req.body.name;
    food.quantity = req.body.quantity;
    await user.save();
    res.redirect('/users/' + req.params.userId + '/foods');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})


module.exports = router