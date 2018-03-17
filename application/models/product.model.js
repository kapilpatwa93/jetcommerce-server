const mongoose = require('mongoose');
const constants = require('../common/constants')
const bcrypt = require('bcrypt');

let productSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    available_quantity : {
        type : Number,
        required: true
    },
    is_deleted : {
        type : String,
        default : false
    },
    created_at : {
        type: Date,
        default : Date.now
    },
    modified_at : {
        type: Date,
        default : Date.now
    },
});
module.exports = mongoose.model('Product', productSchema);