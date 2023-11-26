const express = require('express');
const validator = require('../middlewares/validator');

const router = express.Router();
const authControllers = require('../controllers/authController');

router.get('/login', authControllers.login);

router.post('/login', authControllers.processLogin);

router.get('/register', authControllers.register);

router.post('/register', validator.validateRegistration, validator.     handleValidationErrors,
    authControllers.processRegister);

router.get('/logout', authControllers.logout);


module.exports = router;