const fs = require('fs');
const funkoJson = fs.readFileSync(__dirname + '../../../data/db.js', 'utf8');
const funkos = JSON.parse(funkoJson);

const mainControllers = {
    home: (req, res) => {
        const user = req.session.userLogged;
        res.render('index', {funkos: funkos, user: user});
    },
    contact: (req, res) => {
        res.render('shop/contact');
    },
    about: (req, res) => {
        res.send('Route for About View');
    },
    faqs: (req, res) => {
        res.send('Route for Faqs View');
    }
}

module.exports = mainControllers;