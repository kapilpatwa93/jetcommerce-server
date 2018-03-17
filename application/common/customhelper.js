const commonConfig = require('../../config/common.config');
const constants = require('../common/constants');
const httpStatus = require('http-status');
const sendmail = require('sendmail')();

const CustomHelper = {};
CustomHelper.sendJsonResponse = function (res, status, data, msg) {

    console.log("ss" , status)
    let response;
    response = {
        success: true,
    };
    if (data)
        response['data'] = data;

    if (msg)
        response['message'] = msg;
    res.status(status).json(response);
    return;

};

CustomHelper.sendJsonError = function (res, err) {

    let response;
    let statusCode;
    if (err.hasOwnProperty('statusCode')) {
        statusCode = err.statusCode;
        response = {
            success: false,
            error: {
                message: err.message,
                code: err.code
            },

        }
    } else if (err.hasOwnProperty('errors')) {
        if (err.errors.hasOwnProperty('email')) {
            statusCode = httpStatus.BAD_REQUEST;
            response = {
                success: false,
                error: {
                    message: {
                        email: {
                            msg: err.errors.email.message,
                            value: err.errors.email.value
                        }
                    },
                    code: err.code
                },

            }
        }
    } else {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        response = {
            success: false,
            error: {
                message: constants.error_message.general_error,
                code: constants.error_code.general_error
            },

        };
    }
    res.status(statusCode).json(response);
    return;
}

CustomHelper.getJWTUserId = function (header) {
    return jwt.decode(header.split(' ')[1]);
}
CustomHelper.generatePassword = function (password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
CustomHelper.decodeBase64 = function decodeBase64(dataString) {

    let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    response = {};

    if (matches && matches.length !== 3) {

        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    return response;
}

CustomHelper.uploadProfilePic = (data, callback) => {
    let image_path;

    if (data.profile_pic_data) {

        image_path = Date.now() + '.jpg';
        let bufferImage = CustomHelper.decodeBase64(data.profile_pic_data); //function to create from base4
        Jimp.read(bufferImage.data, function (err, image) {

            if (!fs.existsSync(commonConfig.profile_pic_path)) {

                fs.mkdirSync(commonConfig.profile_pic_path);
            }
            image.resize(200, 200)            // resize
                .quality(100)                 // set JPEG quality
                //  .greyscale()                 // set greyscale
                .write(commonConfig.profile_pic_path + image_path);
            callback(err, image_path);
            return;

        });
        // }else{
    } else {
        callback(null, commonConfig.default_profile_path);
        return;
    }


    /* if(!data.profile_pic){

         callback(null, commonConfig.default_profile_path);
         return;
     }*/

    /*if(data.profile_pic){

        callback(null, data.profile_pic);
        return;
    }*/
};


CustomHelper.sendMail = function (from, to, subject, text, html) {
    return new Promise((resolve,reject)=>{
        let data = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };


        sendmail({
            from: from,
            to: to,
            subject: subject,
            html: html
        }, function (err, reply) {

            if (err) {
                reject(err)
            } else {
                resolve(true);
                return;
            }

        });
    })


};

module.exports = CustomHelper;