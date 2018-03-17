const mongoose = require('mongoose');
const constants = require('../common/constants')
const bcrypt = require('bcrypt');

let orderSchema = mongoose.Schema({

    customer_id : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    order_total: {
        type : Number,
        required: true
    },
    order_date : {
        type : Date,
        default : Date.now
    }
});
module.exports = mongoose.model('CustomerOrder1', orderSchema);