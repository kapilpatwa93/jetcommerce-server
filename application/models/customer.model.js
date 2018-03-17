const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var customerSchema = mongoose.Schema({

    first_name : {
        type : String,
        required : true
    },
    last_name: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    is_deleted : {
        type : String,
        default : false
    },
    created_at : {
      type: Date,
      default : Date.now
    },
    modified_at : {
        type: Date,
        default : Date.now
    },
});

customerSchema.pre('save', function (next) {
    let customer = this;
    if (this.isModified('password') || this.isNew) {

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(customer.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                customer.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

customerSchema.methods.comparePassword = function (password) {

    return bcrypt.compare(password, this.password);
   /* bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });*/
};

customerSchema.path('email').validate(function (value, done) {

    this.model('Customer').count({email: value, is_deleted:false}, function (err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'Email already exists');


module.exports = mongoose.model('Customer', customerSchema);