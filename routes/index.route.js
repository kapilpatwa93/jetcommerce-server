const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authController  = require('../application/controllers/auth.controller');
const UserController  = require('../application/controllers/user.controller');
const customHelper = require('../application/common/customhelper');
const user = require('../application/models/customer.model');
require('../application/models/product.model');
require('../application/models/cart.model');
require('../application/models/customer-order.model');
require('../application/models/cart-products.model');
require('../application/models/order-products.model');
const authMiddleware = require('../application/middlewares/auth.middleware');
const productController = require('../application/controllers/product.controller');
const cartController = require('../application/controllers/cart.controller');
const orderController= require('../application/controllers/order.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',authController.register);
router.post('/login',authController.login);
router.get('/products',authMiddleware,productController.getProducts);
router.get('/cart',authMiddleware,cartController.getCart);
router.post('/add-to-cart',authMiddleware,cartController.addToCart);
router.post('/remove-from-cart',authMiddleware,cartController.removeFromCart);
router.post('/place-order',authMiddleware,orderController.placeOrder);
router.get('/order/:orderid',authMiddleware,orderController.getOrderDetail);
router.get('/orders',authMiddleware,orderController.orderList);
/*customer routes*/
router.get('/getUsers' , authMiddleware, UserController.getUser);
module.exports = router;

