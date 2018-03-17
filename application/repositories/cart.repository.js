const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const CartProduct = mongoose.model('CartProduct');
const Product = mongoose.model('Product');
const httpStatus = require('http-status');
const constants = require('../common/constants');
const PipeLine = require('../common/pipeline');
const productRepository = require('../repositories/product.repository');
module.exports.getCart = (customerId) => {
    console.log(customerId);
    let pipeLine = [];
    pipeLine.push({$match: {"customer_id": mongoose.Types.ObjectId(customerId)}});
    pipeLine = pipeLine.concat(PipeLine.cart.getCart);
    return Cart.aggregate(pipeLine);
};
module.exports.addOrUpdateCart = (data, customerId) => {

}
module.exports.addToCart = (data, customerId) => {
    return new Promise((resolve, reject) => {
        let product;
        productRepository.getProduct(data.product_id)
            .then(resProduct => {
                product = resProduct;
                if (!product) {
                    let errorObj = {
                        statusCode: httpStatus.BAD_REQUEST,
                        message: constants.error_message.product_not_found,
                        code: constants.error_code.product_not_found
                    };
                    reject(errorObj);
                    return;
                }

                let customerCart = {customer_id: mongoose.Types.ObjectId(customerId)};
                return Cart.findOneAndUpdate(customerCart, customerCart, {upsert: true, new: true})

            }).then((cart, rawData) => {
            console.log(cart);
            let findQuery = {
                cart_id: mongoose.Types.ObjectId(cart._id),
                product_id: mongoose.Types.ObjectId(data.product_id)
            };
            let updateQuery = {
                cart_id: mongoose.Types.ObjectId(cart._id),
                product_id: mongoose.Types.ObjectId(data.product_id),
                quantity: data.quantity,
                price: parseFloat(data.quantity) * parseFloat(product.price)
            };
            return CartProduct.findOneAndUpdate(findQuery, updateQuery, {upsert: true})
        }).then((cartProduct) => {
            resolve(true);
        })
            .catch((err) => {
                reject(err);
            });
    })
}


module.exports.removeFromCart= (data, customerId) => {
    return new Promise((resolve, reject) => {
        let product;
        productRepository.getProduct(data.product_id)
            .then(resProduct => {
                product = resProduct;
                if (!product) {
                    let errorObj = {
                        statusCode: httpStatus.BAD_REQUEST,
                        message: constants.error_message.product_not_found,
                        code: constants.error_code.product_not_found
                    };
                    reject(errorObj);
                    return;
                }
                let customerCart = {customer_id: mongoose.Types.ObjectId(customerId)};
                return Cart.findOne(customerCart)

            }).then((cart,) => {
            if(!cart){
                let errorObj = {
                    statusCode: httpStatus.BAD_REQUEST,
                    message: constants.error_message.empty_cart,
                    code: constants.error_code.empty_cart
                };
                reject(errorObj);
                return;
            }


            let findQuery = {
                cart_id: mongoose.Types.ObjectId(cart._id),
                product_id: mongoose.Types.ObjectId(data.product_id)
            };
            return CartProduct.findOneAndRemove(findQuery)
        }).then((cartProduct) => {
            resolve(true);
        })
            .catch((err) => {
                reject(err);
            });
    })
}

module.exports.emptyCartProducts =(cartId)=>{

    return CartProduct.remove({cart_id : mongoose.Types.ObjectId(cartId)});
}