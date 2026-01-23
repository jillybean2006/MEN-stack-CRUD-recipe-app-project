const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
        index: true
        min: 3,
        max: 20
    },
    hash {
        type: String,
    },
    salt {
        type: String,
    
    },
});

module.exports = mongoose.model('User', userSchema);