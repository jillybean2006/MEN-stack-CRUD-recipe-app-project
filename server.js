import { configDotenv } from "dotenv";
import "dotenv/config"

import express from 'express';

import mongoose from 'mongoose';
dotenv.config();
let Product = require('./models/productModles');


app.use (express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    app.get("/recipe-keeper", (req, res) => {
    res.send('Welcome to Recipe Keeper!');  
    });



    app.post("/products", async (req, res) => {
        try {
            let product = await Product.create(req.body)
            res.status(200).json(product);
        } catch (error) { res.status(500).json({message: error.message});
            
        }
    });



let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log("MONGODB_URI:", process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)