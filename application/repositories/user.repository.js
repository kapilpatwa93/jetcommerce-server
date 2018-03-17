const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');



module.exports.getUser = () => {

	return new Promise( (resolve, reject) => {

		Customer.find({})
		.exec(function(err , users){
			
			if(err){

				reject(err);
				return
			}
			resolve(users);
			return
		});
	})
};