const cartRepository = require('../repositories/cart.repository');
const customHelper = require('../common/customhelper');
const constants = require('../common/constants');
const httpStatus = require('http-status');
const customValidator = require('../common/customvalidator');


module.exports.getCart = (req, res, next) => {

    let customer = req.customer.customer;
    cartRepository.getCart(customer._id)
        .then((data) => {
            if (data.length == 0) {
                customHelper.sendJsonResponse(res, httpStatus.OK, null, constants.success_message.empty_cart);
                return;
            }

            customHelper.sendJsonResponse(res, httpStatus.OK, data[0], null);
            return;
        }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    })
};

module.exports.addToCart = (req, res, next) => {
    let customer = req.customer.customer;
    let rules = {
        'product_id': customValidator.product_id,
        'quantity': customValidator.quantity,
    };

    customValidator.validate(req, rules).then((data) => {

        return cartRepository.addToCart(req.body, customer._id)
    }).then((data) => {
        if (!data) {
            customHelper.sendJsonResponse(res, httpStatus.OK, data, constants.success_message.empty_cart);
            return;
        }
        customHelper.sendJsonResponse(res, httpStatus.OK, null, constants.success_message.product_added_in_cart);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
};

module.exports.removeFromCart = (req, res, next) => {
    let customer = req.customer.customer;
    let rules = {
        'product_id': customValidator.product_id,
    };
    customValidator.validate(req, rules).then((data) => {

        return cartRepository.removeFromCart(req.body, customer._id)
    }).then((response) => {

        customHelper.sendJsonResponse(res, httpStatus.OK, null, constants.success_message.product_removed_from_cart);
        return;
    }).catch((err) => {
        customHelper.sendJsonError(res, err);
        return;
    });
}