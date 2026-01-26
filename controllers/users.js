import express from 'express';
const router = express.Router();

import User from '../models/user.js';
import mongoose from 'mongoose';


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


async function index(req, res) {
    try {
        const users = await User.find({});
        res.render('index.ejs', {users});
    } catch (error) {
    res.redirect('/');
    }

}

async function show(req, res) {
    try {
        const user = await User.findById(req.params.userId).populate('pantry');
        res.render('show.ejs', { user });
    } catch (error) {
        res.redirect('/');

}}





router.get ('/',index)
router.get('/:userId',show)





export default router;




