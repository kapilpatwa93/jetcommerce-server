const userRepository = require('../repositories/user.repository');
const customHelper = require('../common/customhelper');
const constants = require('../common/constants');
const httpStatus = require('http-status');



module.exports.getUser = (req , res, next) => {

	console.log("in")
	userRepository.getUser()
	.then( (data) => {

		customHelper.sendJsonResponse(res, httpStatus.OK, data, constants.success_message.success_get_msg);
        return;

	}).catch( (err) => {

		customHelper.sendJsonError(res, err);
        return;
	})
}