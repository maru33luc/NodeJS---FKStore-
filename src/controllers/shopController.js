const fs = require('fs');
const funkoJson = fs.readFileSync(__dirname + '../../../data/db.js', 'utf8');
const funkos = JSON.parse(funkoJson);


const shopControllers = {
    index: (req, res) => {
        // res.send('Route for get all products');
        res.render('shop/shop', { funkos: funkos });
    },
    detail: (req, res) => {
        // res.send('Route for get a product from an id');

        const id = req.params.id;
        const funko = funkos.find(f => f.product_id == id);
        if(!funko) {
            return res.send('No se encontró el funko que estás buscando');
        }else{
            return res.render('shop/item', { funko: funko, funkos: funkos });
        }
        
        
    },
    cart: (req, res) => {
        // res.send('Route for the cart view');
        res.render('shop/cart');
    },
    checkout: (req, res) => {
        res.send('Route for go to checkout page');
    },
    processCheckout: (req, res) => {
        res.send('Route for process the checkout');
    },
    addCart: (req, res) => {
        res.send('Route for add the current item to the shop cart');
    }
}

module.exports = shopControllers;




