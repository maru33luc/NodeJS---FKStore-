const express = require('express');

const router = express.Router();
const shopControllers = require('../controllers/shopController');

router.get('/', shopControllers.index);

router.get('/item/:id/', shopControllers.detail); //detalle de producto

router.get('/cart', shopControllers.cart); //carrito de compras
router.get('/local', shopControllers.localCart); //obtiene carrito local
router.get('/add', shopControllers.addCart); // agrega funko desde vista carrito por usuario logueado
router.get('/addItem', shopControllers.addItemCart); //agrega funko en vista item por usuario logueado

router.post('/cart', shopControllers.processCheckout);

router.get('/apply-filters', shopControllers.applyFilters);// aplica filtros en vista shop



module.exports = router;