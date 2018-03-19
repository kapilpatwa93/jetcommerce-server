const productRepository = require('../repositories/product.repository');
const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
module.exports.getProducts = (req , res, next) => {

    productRepository.getProducts()
        .then( (data) => {

            customHelper.sendJsonResponse(res, httpStatus.OK, data, null);
            return;
        }).catch( (err) => {

        customHelper.sendJsonError(res, err);
        return;
    })
};

module.exports.populateProduct = (req,res,next)=>{
    productRepository.populateProduct().then(success=>{

    }).catch((err)=>{
        customHelper.sendJsonError(res, err);
        return;
    })
}