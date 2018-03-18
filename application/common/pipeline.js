const Pipeline = {
    cart: {
        getCart: [
            {
                "$lookup" : {
                    "from" : "cartproducts",
                    "localField" : "_id",
                    "foreignField" : "cart_id",
                    "as" : "products"
                }
            },
            {
                "$unwind" : {
                    "path" : "$products"
                }
            },
            {
                "$lookup" : {
                    "from" : "products",
                    "localField" : "products.product_id",
                    "foreignField" : "_id",
                    "as" : "product"
                }
            },
            {
                "$unwind" : {
                    "path" : "$product"
                }
            },
            {
                "$addFields" : {
                    "products.product_name" : "$product.name",
                    "products.product_description" : "$product.description",
                    "products.product_price" : "$product.price",
                    "products.available_quantity" : "$product.available_quantity",
                    "products.image1" : "$product.image1"

                }
            },
            {
                "$group" : {
                    "_id" : "$products.cart_id",
                    "customer_id" : {
                        "$first" : "$customer_id"
                    },
                    "products" : {
                        "$push" : "$products"
                    },
                    "cart_total" : {
                        "$sum" : "$products.price"
                    }
                }
            }
        ]
    } ,order: {
        getOrderDetail: [
            {
                "$lookup" : {
                    "from" : "orderproducts",
                    "localField" : "_id",
                    "foreignField" : "order_id",
                    "as" : "products"
                }
            },
            {
                "$unwind" : {
                    "path" : "$products"
                }
            },
            {
                "$lookup" : {
                    "from" : "products",
                    "localField" : "products.product_id",
                    "foreignField" : "_id",
                    "as" : "product"
                }
            },
            {
                "$unwind" : {
                    "path" : "$product"
                }
            },
            {
                "$addFields" : {
                    "products.product_name" : "$product.name",
                    "products.product_description" : "$product.description",
                    "products.product_price" : "$product.price",
                    "products.available_quantity" : "$product.available_quantity",
                    "products.image1" : "$product.image1"
                }
            },
            {
                "$group" : {
                    "_id" : "$products.order_id",
                    "customer_id" : {
                        "$first" : "$customer_id"
                    },
                    "order_total" : {
                        "$first" : "$order_total"
                    },
                    "products" : {
                        "$push" : "$products"
                    }
                }
            }
        ]
    }
};

module.exports = Pipeline;