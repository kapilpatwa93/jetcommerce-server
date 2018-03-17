const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const constants = require('../common/constants');
const jwtConfig = require('../../config/jwt.config');
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const customHelper = require('../common/customhelper');
const commonConfig = require('../../config/common.config');
require('../models/customer.model');
const Customer = mongoose.model('Customer');
const httpStatus = require('http-status');


module.exports.register = (data) => {

            let newCustomer = new Customer();
            newCustomer.first_name = data.body.first_name;
            newCustomer.last_name = data.body.last_name;
            newCustomer.username = data.body.username;
            newCustomer.email = data.body.email;
            newCustomer.password = data.body.password;
            return newCustomer.save();

    //return;
};


module.exports.login = (data) => {

    return new Promise((resolve, reject) => {
        let customer;
        Customer.findOne({email: data.body.email, is_deleted: false})
            .then(resCustomer => {

                customer = resCustomer;
                if (!customer) {
                    let errorObj = {
                        statusCode: httpStatus.BAD_REQUEST,
                        message: constants.error_message.user_not_found,
                        code: constants.error_code.user_not_found
                    };
                    reject(errorObj);
                    return;

                }
                return resCustomer.comparePassword(data.body.password)
            })
            .then(isMatch => {

                if (isMatch) {
                    let token = jwt.sign({customer: customer}, jwtConfig.secret);
                    customer = JSON.parse(JSON.stringify(customer));
                    delete customer.password;
                    resolve({token: token, customer: customer});
                    return;
                } else {
                    let errorObj = {
                        statusCode: httpStatus.UNAUTHORIZED,
                        message: constants.error_message.invalid_credentials,
                        code: constants.error_code.invalid_credentials
                    };
                    reject(errorObj);
                    return;
                }
            }).catch((err) => {
            reject(err);
            return;
        })
    });
};
