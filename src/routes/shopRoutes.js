const express = require('express');

const router = express.Router();
const shopControllers = require('../controllers/shopController');

router.get('/', shopControllers.index);

router.get('/item/:id/', shopControllers.detail);

// router.post('/item/:id/add', shopControllers.addCart);


router.get('/cart', shopControllers.cart);
router.get('/add', shopControllers.addCart);

router.post('/cart', shopControllers.processCheckout);

router.get('/apply-filters', shopControllers.applyFilters);



module.exports = router;