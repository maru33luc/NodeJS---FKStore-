const express = require('express');

const router = express.Router();
const shopControllers = require('../controllers/shopController');

router.get('/', shopControllers.index);

router.get('/item/:id', shopControllers.detail);

router.post('/item/:id/add', shopControllers.addCart);

router.get('/cart', shopControllers.cart);

router.post('/cart', shopControllers.processCheckout);



module.exports = router;