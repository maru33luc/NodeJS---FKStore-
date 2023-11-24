const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainController');


router.get('/home', mainControllers.home);

router.get('/contact', mainControllers.contact);

router.get('/about', mainControllers.about);

router.get('/faqs', mainControllers.faqs);


router.get('/', (req, res) => {
    res.redirect('/home');
});


module.exports = router;