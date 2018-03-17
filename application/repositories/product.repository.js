const mongoose = require('mongoose');

const Product = mongoose.model('Product');


module.exports.getProducts = () => {

       return Product.find({});
};

module.exports.populateProduct = ()=>{

}

module.exports.getProduct = function(productId){
    console.log(productId);
    return Product.findOne({_id: mongoose.Types.ObjectId(productId)});
};
module.exports.verifyProductQuantity = (products)=>{
    let promises = [];
    for(let i = 0; i < products.length;i++){
        let query = {
            _id : mongoose.Types.ObjectId(products[i].product_id),
            quantity : {$gte : products[i].quantity}
        };

        promises.push(Product.find(query));
    }

    Promise.all(promises).then(()=>{
        return Promise.resolve(true);
    }).catch((err)=>{
        return Promise.reject(err);
    })
}
module.exports.updateProductsQuantity = (products)=>{
    return new Promise((resolve,reject)=>{
        console.log(products);
        let promises = [];
        for(let i = 0; i < products.length;i++){
            let query = {
                _id : mongoose.Types.ObjectId(products[i].product_id)
            };

            let updateQuery = {
                $inc : {
                    available_quantity : products[i].quantity * -1
                }
            }
            promises.push(Product.findOneAndUpdate(query,updateQuery));
        }

        Promise.all(promises).then(()=>{
           resolve(true);
        }).catch((err)=>{
           reject(err);
        })
    })
}