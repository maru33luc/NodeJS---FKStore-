const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('lastname').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    body('email').isEmail().withMessage('Correo electrónico no válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('repassword')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas deben coincidir');
            }
            return true;
        }),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    const user = req.session.userLogged;

    if (!errors.isEmpty()) {
        const errorObject = errors.mapped();

        return res.render('auth/register', {
            errors: errorObject,
            oldData: req.body,
            user: user
        });
    }

    next();
};

module.exports = { validateRegistration, handleValidationErrors };
