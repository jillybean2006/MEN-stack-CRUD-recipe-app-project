
import mongoose from 'mongoose';

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

const Food = mongoose.model('Food', foodSchema);
export default Food;