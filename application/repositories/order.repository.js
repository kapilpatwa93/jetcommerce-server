const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const Order = mongoose.model('CustomerOrder');
const CartProduct = mongoose.model('CartProduct');
const OrderProduct = mongoose.model('OrderProduct');
const Product = mongoose.model('Product');
const httpStatus = require('http-status');
const constants = require('../common/constants');
const PipeLine = require('../common/pipeline');
const productRepository = require('../repositories/product.repository');
const cartRepository = require('../repositories/cart.repository');

module.exports.placeOrder = (data, customerId) => {
    return new Promise((resolve, reject) => {
        let order;
        let cart;
        cartRepository.getCart(customerId)
            .then((resCart) => {
                cart = resCart;
                if (cart.length == 0) {
                    let errorObj = {
                        statusCode: httpStatus.BAD_REQUEST,
                        message: constants.error_message.empty_cart,
                        code: constants.error_code.empty_cart
                    };
                    reject(errorObj);
                    return;
                }
                return this.createOrder(customerId, cart[0].cart_total);
            })
            .then((resOrder) => {
                order = resOrder;
                console.log("order created", cart);

                return this.addOrderProducts(cart[0].products, resOrder);
            })
            .then((success) => {
                return productRepository.updateProductsQuantity(cart[0].products)
            })
            .then((success) => {
                return cartRepository.emptyCartProducts(cart[0]._id);
            })
            .then((emptyCartResponse) => {
                resolve(true);
            })
            .catch((err) => {

                console.log(err);
                reject(err);
            });

    })
};

module.exports.createOrder = (customerId, orderTotal) => {
    return new Promise((resolve, reject) => {

        let newOrder = new Order();
        newOrder.customer_id = mongoose.Types.ObjectId(customerId);
        newOrder.order_date = Date.now();
        newOrder.order_total = orderTotal;
        if (newOrder.save()) {
            console.log("here is order");
            resolve(newOrder);
        } else {
            let errorObj = {
                statusCode: httpStatus.BAD_REQUEST,
                message: constants.error_message.general_error,
                code: constants.error_code.general_error
            };
            reject(errorObj)
        }
        ;
    })

};

module.exports.addOrderProducts = (products, order) => {
    return new Promise((resolve, reject) => {

        let promises = [];
        for (let i = 0; i < products.length; i++) {
            console.log(products[i]);
            let newOrderProduct = new OrderProduct();
            newOrderProduct.order_id = mongoose.Types.ObjectId(order._id);
            newOrderProduct.quantity = products[i].quantity;
            newOrderProduct.product_id = products[i].product_id;
            newOrderProduct.price = products[i].price;
            promises.push(newOrderProduct.save());
        }

        Promise.all(promises).then(() => {
            console.log("order roe saved");
            resolve(true);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.orderDetails = (orderId, customerId) => {

    let pipeLine = [];
    let match = {
        $match:
            {
                "_id": mongoose.Types.ObjectId(orderId),
                "customer_id": mongoose.Types.ObjectId(customerId)
            }
    };
    pipeLine.push(match);
    pipeLine = pipeLine.concat(PipeLine.order.getOrderDetail);
    console.log(pipeLine);
    return Order.aggregate(pipeLine);
}

module.exports.orders = (customerId) => {
    return Order.find({customer_id: mongoose.Types.ObjectId(customerId)});
}
