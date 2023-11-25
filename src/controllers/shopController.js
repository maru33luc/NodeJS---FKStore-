const funkoService = require('../services/funkoServices');


const shopControllers = {
    
    index: (req, res) => {
        const user = req.session.userLogged;
        const funkos = funkoService.getFunkos();
        res.render('shop/shop', { funkos: funkos, user: user });
        
    },
    detail: (req, res) => {
        const user = req.session.userLogged;
        const id = req.params.id;
        const funko = funkos.find(f => f.product_id == id);
        if(!funko) {
            return res.send('No se encontró el funko que estás buscando');
        }else{
            return res.render('shop/item', { funko: funko, funkos: funkos,
            user: user });
        }
    },
    cart: (req, res) => {
        const user = req.session.userLogged;
        const funkos = [ {
            "product_id": 9,
    "licence_name": "Harry Potter",
    "category_name": "Funko Pop!",
    "product_name": "Hermione Granger",
    "product_description": "Funko coleccionable del personaje de Hermione Granger",
    "product_sku": "AJSHDJ3333",
    "product_price": 100.99,
    "product_stock": 20,
    "dues": 1,
    "img-front": "https://www.lamarquezone.fr/images/Image/xfk5860.jpg",
    "img-back": "https://i.pinimg.com/736x/af/6e/93/af6e938baef2bd088f007a3df720f0b4.jpg"

        }
        
        ];
        res.render('shop/cart', { funkos: funkos, user: user });
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




