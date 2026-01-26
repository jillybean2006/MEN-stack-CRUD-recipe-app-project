import express from 'express';
import router from '../server';


const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: String, trim: true }, 
    unit: { type: String, trim: true },   
  },
  { _id: false }
);

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, 
    description: { type: String, trim: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);

export default router;