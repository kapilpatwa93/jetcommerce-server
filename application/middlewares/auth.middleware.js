const customHelper = require('../common/customhelper');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.config');
const constants = require('../common/constants');

/*module.exports = (req,res,next)=>{

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){

        let errorObj = {
            statusCode: httpStatus.BAD_REQUEST,
            message: constants.error_message.token_missing,
            code: constants.error_code.token_missing
        };
        customHelper.sendJsonError(res,errorObj);
        return;

    }
        jwt.verify(token,jwtConfig.secret).then(decoded=>{

                req.customer = decoded;
                next();

        }).catch((err)=>{
            console.log("err",err);
            let errorObj = {
                statusCode: httpStatus.UNAUTHORIZED,
                message: constants.error_message.authentication_failed,
                code: constants.error_code.authentication_failed
            };
            customHelper.sendJsonError(res,errorObj);
        })
}*/


module.exports = (req,res,next)=>{

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err,decoded)=>{
            if(err){
                let errorObj = {
                statusCode: httpStatus.UNAUTHORIZED,
                message: constants.error_message.authentication_failed,
                code: constants.error_code.authentication_failed
            };
            customHelper.sendJsonError(res,errorObj);
            }else{
                req.customer = decoded;
                next();
            }
        })
    }else{
     let errorObj = {
            statusCode: httpStatus.BAD_REQUEST,
            message: constants.error_message.token_missing,
            code: constants.error_code.token_missing
        };
        customHelper.sendJsonError(res,errorObj);
        return;
    }
}