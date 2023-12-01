const express = require('express');

const router = express.Router();
const shopControllers = require('../controllers/shopController');

router.get('/', shopControllers.index);

router.get('/item/:id/', shopControllers.detail);
router.get('/item/:id/add', shopControllers.addItemCart);

router.get('/cart', shopControllers.cart);
router.get('/local', shopControllers.localCart);
router.get('/add', shopControllers.addCart);

router.post('/cart', shopControllers.processCheckout);

router.get('/apply-filters', shopControllers.applyFilters);



module.exports = router;