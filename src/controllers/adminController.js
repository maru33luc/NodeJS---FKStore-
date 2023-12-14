const fs = require('fs');
const funkoJson = fs.readFileSync(__dirname + '../../../data/db.js', 'utf8');
const funkos = JSON.parse(funkoJson);

const adminControllers = {
    home: (req, res) => {
        const user = req.session.userLogged;
        res.render('admin/admin', {funkos: funkos, user: user});
    },
    create: (req, res) => {
        const user = req.session.userLogged;
        res.render('admin/create', {user: user});
    },
    store: (req, res) => {
        const funko = req.body;
        funko.product_id = funkos.length + 1;
        funkos.push(funko);
        fs.writeFileSync('./data/db.js', JSON.stringify(funkos, null, ' '));
        res.redirect('/admin');
    },
    addCart: (req, res) => {
        res.send('Route for add the current item to the shop cart');
    },
    getEdit: (req, res) => {
        const user = req.session.userLogged;
        const id = req.params.id;
        const funko = funkos.find(f => f.product_id == id);
        if(!funko) {
            return res.send('No se encontró el funko que estás buscando');
        }
        else{
            res.render('admin/edit', {funko: funko, user: user});
        }
    },
    postEdit: (req, res) => {
        const id = req.params.id;
        const index = funkos.findIndex(f => f.product_id == id);
        if (index == -1) {
            return res.send('No se encontró el funko que estás buscando');
        } else {
            const funko = funkos[index];
            funkos[index] = { ...funko, ...req.body };
    
            fs.writeFile(__dirname + '../../../data/db.js', JSON.stringify(funkos, null, ' '), (err) => {
                if (err) {
                    return res.send('Error al guardar la información');
                }
                res.redirect('/admin');
            });
        }
    },
    delete: (req, res) => {
        const id = req.params.id;
        const funko = funkos.find(f => f.product_id == id);
        if(!funko) {
            return res.send('No se encontró el funko que estás buscando');
        }
        else{
            const funkoDelete = funkos.filter(f => f.product_id != id);
            fs.writeFileSync(__dirname + '../../../data/db.js', JSON.stringify(funkoDelete, null, ' '));
            res.redirect('/admin');
        }   
    }
}

module.exports = adminControllers;
