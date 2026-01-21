
let mongoose = require('mongoose');


let productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true , 'Product name is required']
    },
    quantity: { 
     type: Number,
        required:  true , 
        default: 0
    
      
    },
    price : {
        type: Number,
        required: true,
    
    },
    image: {
        type: String,
        required: false,
    }

    },
    { 
        timestamps: true
     }
);

let product = mongoose.model('Product', productSchema);

module.exports = product;