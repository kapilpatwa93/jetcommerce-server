const customValidator = require('../common/customvalidator');
const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const fs = require('fs');
const hogan  = require("hogan.js");
const authRepository = require('../repositories/auth.repository');
const constants = require('../common/constants');

module.exports.register = (req, res, next) => {

    let rules = {
        'first_name': customValidator.first_name,
        'last_name': customValidator.last_name,
        'email': customValidator.email,
        'password': customValidator.password,
    };

    req.checkBody('confirm_password', constants.error_message.password_not_matched).equals(req.body.password);
    customValidator.validate(req, rules).then( (data) => {

        return authRepository.register(req);
    })
    .then(user => {
        customHelper.sendJsonResponse(res, httpStatus.OK, user, constants.success_message.registered_successfully);
        return;
    }).catch((err) => {
        console.log(err);
        customHelper.sendJsonError(res, err);
        return;
    });

};


module.exports.login = (req, res, next) => {

    let rules = {
        'email': customValidator.email,
        'password': customValidator.password
    };
    customValidator.validate(req, rules)
        .then((data) => {
            return authRepository.login(data)
        })
        .then(responseData => {
            customHelper.sendJsonResponse(res, httpStatus.OK, responseData, constants.success_message.logged_in_successfully);
            return;

        }).catch((err) => {
        console.log(err);
        customHelper.sendJsonError(res, err);
        return;
    })
};
