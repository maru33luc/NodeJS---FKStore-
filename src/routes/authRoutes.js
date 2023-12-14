const express = require('express');
const validator = require('../middlewares/validator');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');

const router = express.Router();
const authControllers = require('../controllers/authController');

router.get('/login',ensureAuthenticated , authControllers.login);

router.post('/login', authControllers.processLogin);

router.get('/register',ensureAuthenticated , authControllers.register);

router.post('/register', validator.validateRegistration, validator.handleValidationErrors,
    authControllers.processRegister);

router.get('/logout', authControllers.logout);


module.exports = router;