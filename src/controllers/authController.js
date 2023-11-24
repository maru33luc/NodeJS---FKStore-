const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.js');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const authControllers = {
    login: (req, res) => {
        const user = req.session.userLogged;
        res.render ('auth/login', {user: user});
    },
    processLogin: (req, res) => {
        const {email, password} = req.body;
        let userToLogin = users.find(user => user.email === email && user.password === password);
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
        res.render ('auth/register');
    },
    processRegister: (req, res) => {
        res.render ('auth/register');
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }

};

module.exports = authControllers;