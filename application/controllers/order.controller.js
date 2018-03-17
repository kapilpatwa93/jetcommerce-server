const orderRepository = require('../repositories/order.repository');
const customHelper = require('../common/customhelper');
const constants = require('../common/constants');
const httpStatus = require('http-status');
const customValidator = require('../common/customvalidator');


module.exports.placeOrder = (req, res, next) => {

    let customer = req.customer.customer;
    orderRepository.placeOrder(req.body, customer._id)
        .then((success) => {

            customHelper.sendJsonResponse(res, httpStatus.OK, null, constants.success_message.order_placed_successfully);
            return;
        }).catch((err) => {
        console.log(err);
        customHelper.sendJsonError(res, err);
        return;
    })
};
module.exports.getOrderDetail = (req, res, next) => {

    let customer = req.customer.customer;
    let orderId = req.params.orderid;
    let rules = {
        'orderid': customValidator.order_id,
        
    };

    customValidator.validate(req, rules).then((data) => {
        return orderRepository.orderDetails(orderId, customer._id)
    })

        .then((order) => {
            if (order.length == 0) {
                customHelper.sendJsonResponse(res, httpStatus.OK, null, constants.success_message.order_not_found);
                return;
            }
            customHelper.sendJsonResponse(res, httpStatus.OK, order[0], constants.success_message.order_placed_successfully);
            return;
        }).catch((err) => {
        console.log(err);
        customHelper.sendJsonError(res, err);
        return;
    })
};
module.exports.orderList = (req, res, next) => {

    let customer = req.customer.customer;

    orderRepository.orders(customer._id)
        .then((order) => {

            customHelper.sendJsonResponse(res, httpStatus.OK, order, constants.success_message.order_placed_successfully);
            return;
        }).catch((err) => {
        console.log(err);
        customHelper.sendJsonError(res, err);
        return;
    })
};


