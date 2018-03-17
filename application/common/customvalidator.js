const expressValidator = require('express-validator');
const constants = require("./constants");
const httpStatus = require('http-status');
const customValidator = {};


customValidator.first_name = {
    notEmpty: {
        errorMessage: 'First name is required'
    },

};

customValidator.last_name = {
    notEmpty: {
        errorMessage: 'Last name is required'
    }
};
customValidator.username = {
    notEmpty: true
};
customValidator.email = {
    notEmpty: {
        errorMessage : "Email id is required"
    },
    isEmail: {
        errorMessage: 'Invalid Email id'
    },

};

customValidator.password = {
    notEmpty: {
        errorMessage: "Password is required"
    }
};
customValidator.confirm_password = {
    notEmpty : {
        errorMessage : "Confirm password is required"
    },
    equals : "password"
};

customValidator.product_id= {
    notEmpty : {
        errorMessage : "Product ID is required"
    },
    isMongoId: {
        errorMessage: "Invalid product ID"
    }
};

customValidator.order_id= {
    notEmpty : {
        errorMessage : "Order ID is required"
    },
    isMongoId: {
        errorMessage: "Invalid order ID"
    }
};
customValidator.quantity= {
    notEmpty : {
        errorMessage : "Quantity is required"
    },
    isNumeric: {
        errorMessage: "Quantity should be valid number"
    }
};



customValidator.validate = (req, rules) => {
    return new Promise((resolve,reject)=>{
        req.check(rules);
        req.getValidationResult().then(result => {
            if (!result.isEmpty()) {
                let errorObj = {
                    statusCode : httpStatus.BAD_REQUEST,
                    message :   result.mapped(),
                    code : constants.error_code.validation_error,

                };
                reject(errorObj);
                return;
            } else {
                resolve(req);
                return;
            }
        });
    })
};
customValidator.validate1 = (req, rules) => {
    return new Promise((resolve,reject)=>{
        req.check(rules);
        req.getValidationResult().then(result => {
            if (!result.isEmpty()) {
                let errorObj = {
                    statusCode : httpStatus.BAD_REQUEST,
                    message :   result.mapped(),
                    code : constants.error_code.validation_error,

                };
                reject(result.mapped());
                return;
            } else {
                resolve(req);
                return;
            }
        });
    })
};

customValidator.middlewareObj = {
    customValidators: {

        isArray : ((values)=>{
            return Array.isArray(values) && values.length > 0;
        }),
    },
    errorFormatter: function (param, msg, value, location) {
        return {
            msg: msg,
            value: value
        };
    },
    customSanitizers : {
        toSlug : (value =>{
            return value.toLowerCase().trim();
        }),
        toSlugArray : (valArr=>{
            return valArr.map((val)=>{
                return val.toLowerCase().trim();
            })
        }),
        toPrice : (value=>{
            return parseFloat(value).toFixed(2);
        })
    }
};
module.exports = customValidator;

