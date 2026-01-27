import mongoose from 'mongoose';


const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: Number
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;

