// const fs = require('fs');
// const path = require('path');

// const usersFilePath = path.join(__dirname, '../../data/users.js');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const userService = require('../services/userServices.js');

const authControllers = {
    login: (req, res) => {
        const user = req.session.userLogged;
        res.render ('auth/login', {user: user, errors: undefined});
    },
    processLogin: (req, res) => {
        const {email, password} = req.body;
        let userToLogin = userService.getUserByEmailAndPass(email, password);
        if (userToLogin) {
            req.session.userLogged = userToLogin;
            res.redirect('/');
        } else {
            res.render('auth/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }, user: userToLogin
            });
        }
    },
    register: (req, res) => {
        const user = req.session.userLogged;
        res.render ('auth/register', {user: user});
    },
    processRegister: (req, res) => {
        const user = req.session.userLogged;
        const {name, lastname, email, password} = req.body;
        let userInDB = userService.getUserByEmailAndPass(email, password)
        if (userInDB) {
            res.render('auth/register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                }, user: user
            });
        } else {
            let newUser = {
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                password: password.trim(),
            };
            userService.createUser(newUser);
            res.redirect('/login');
        }
        
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }

};

module.exports = authControllers;