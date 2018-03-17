const mongoose = require('mongoose');
const constants = require('../common/constants');
const bcrypt = require('bcrypt');

let orderProductSchema = mongoose.Schema({

    order_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },


});
module.exports = mongoose.model('OrderProduct', orderProductSchema);