const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
  
    quantity: Number
}, { timeStamps: true });


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

module.exports = mongoose.model('User', userSchema);
