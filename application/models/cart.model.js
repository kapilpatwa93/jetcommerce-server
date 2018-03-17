const mongoose = require('mongoose');
const constants = require('../common/constants')
const bcrypt = require('bcrypt');

let cartSchema = mongoose.Schema({

    customer_id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    products : [{
        product_id : {
            type : mongoose.Schema.ObjectId,
            required: true,
        },
        quantity : {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
    }],
    cart_total: {
        type : Number,
        required: true
    },
});
module.exports = mongoose.model('Cart', cartSchema);