require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        throw error;
    }
};

module.exports = connectDB;
            
    