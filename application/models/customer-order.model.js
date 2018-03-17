const mongoose = require('mongoose');
const constants = require('../common/constants');
const bcrypt = require('bcrypt');

let orderProductSchema = mongoose.Schema({

    customer_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    order_date : {
        type : Date,
        default : Date.now
    },
    order_total  : {
        type : Number,
    }


});
module.exports = mongoose.model('CustomerOrder', orderProductSchema);