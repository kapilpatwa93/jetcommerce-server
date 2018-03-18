var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const commonConfig = require('./config/common.config');
const fs = require('fs');
const expressValidator = require('express-validator');
const customValidator = require('./application/common/customvalidator');
require('./config/mongo.config');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, commonConfig.product_image_path)));
app.use(express.static(path.join(__dirname, commonConfig.profile_pic_path)));
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}
app.use(expressValidator(customValidator.middlewareObj));
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token,Origin');
    next();
});
/*route files*/
app.use('/api/', require('./routes/index.route'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
