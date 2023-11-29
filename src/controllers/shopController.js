const funkoService = require('../services/funkoServices');
const cartService = require('../services/cartServices');
const userServices = require('../services/userServices');

const shopControllers = {

    index: (req, res) => {
        const user = req.session.userLogged;
        const funkos = funkoService.getFunkos();
        res.render('shop/shop', { funkos: funkos, user: user });
    },
    applyFilters: (req, res) => {

        const user = req.session.userLogged;
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
        const ordenarPor = req.query.ordenarPor || 'asc';

        // Obtén los Funkos desde el servicio
        const funkos = funkoService.getFunkos();

        // Filtra y ordena los Funkos según los parámetros
        const funkosFiltradosYOrdenados = funkoService.filtrarYOrdenarFunkos(funkos, minPrice, maxPrice, ordenarPor);

        // Devuelve los Funkos filtrados y ordenados como JSON
        res.render('shop/shop', {
            funkos: funkosFiltradosYOrdenados,
            user: user
        });
    },
    detail: (req, res) => {
        let error = undefined;
        const user = req.session.userLogged;
        const id = req.params.id;
        const funkos = funkoService.getFunkos();
        const funko = funkoService.getFunko(id);
        if (!funko) {
            return res.send('No se encontró el funko que estás buscando');
        } else {
            return res.render('shop/item', {
                funko: funko, funkos: funkos,
                user: user, error: error
            });
        }
    },
    cart: (req, res) => {
        const user = req.session.userLogged;
        if (user) {
            const items = cartService.getCart(user.id);
            if (items) {
                const funkosItems = [];
                items.items.forEach(item => {
                    const funko = funkoService.getFunko(item.id);
                    funko.quantity = item.quantity;
                    funkosItems.push(funko);
                });

                res.render('shop/cart', {
                    funkos: funkosItems, user: user,
                    userId: user.id
                });
            }
            else {
                res.render('shop/cart', {
                    funkos: [], user: user,
                    userId: user.id
                });
            }
        }
        else {
            res.render('shop/cart', {
                funkos: [], user: user,
                userId: null
            });
        }
    },
    checkout: (req, res) => {
        res.send('Route for go to checkout page');
    },
    processCheckout: (req, res) => {
        res.send('Route for process the checkout');
    },

    addItemCart: (req, res) => {
        let error = undefined;
        const user = req.session.userLogged;
        const id = req.params.id;
        const funko = funkoService.getFunko(id);
        const funkos = funkoService.getFunkos();
        const quantity = req.query.quantity;
        if(user){
            const cart = cartService.getCart(user.id);
            if (cart) {
                const item = cart.items.find(item => item.id == id);
                if (item) {
                     error = 'El producto ya se encuentra en el carrito';
                    res.render(`shop/item`, {
                        funkos: funkos, user: user,
                        userId: user.id, funko: funko, error: error
                    });
                }
                else {
                    cart.items.push({
                        id: id, name: funko.product_name,
                        price: funko.product_price,
                        quantity: parseInt(quantity)
                    });
                }
                cartService.updateCart(user.id, cart);    
                res.render(`shop/item`, {
                    funkos: funkos, user: user,
                    userId: user.id, funko: funko, error: error
                });
            } else {
                const newCart = cartService.createCart(user.id);
                const funko = funkoService.getFunko(id);
                newCart.items.push({
                    id: id, name: funko.name,
                    price: funko.price,
                    quantity: parseInt(quantity)
                });
                cartService.updateCart(user.id, newCart);
                res.render(`shop/item`, {
                    funkos: funkosItems, user: user,
                    userId: user.id, funko: funko, error: error
                });
            }
        }
        // else{
        //     error = 'Debes estar logueado para agregar productos al carrito';
        //     res.render(`shop/item`, {
        //         funkos: funkos, user: user,
        //         funko: funko, error: error
        //     });
            
        // }
        
        
    },
    addCart: (req, res) => {
        user = req.session.userLogged;
        const userId = parseInt(req.query.idUser);
        const id = req.query.id;
        const quantity = req.query.quantity;
        const cart = cartService.getCart(userId);
        if (cart) {
            const item = cart.items.find(item => item.id == id);
            if (item) {
                item.quantity = parseInt(quantity);
            }
            else {
                cart.items.push({ id: id, quantity: parseInt(quantity) });
            }
            cartService.updateCart(userId, cart);
            const items = cartService.getCart(userId);
            const funkosItems = [];
            items.items.forEach(item => {
                const funko = funkoService.getFunko(item.id);
                funko.quantity = item.quantity;
                funkosItems.push(funko);
            });

            res.render('shop/cart', {
                funkos: funkosItems, user: user,
                userId: userId
            });
        } else {
            const newCart = cartService.createCart(userId);
            const item = newCart.items.find(item => item.id === id);
            if (item) {
                item.quantity = parseInt(quantity);
            }
            else {
                newCart.items.push({ id: id, quantity: parseInt(quantity) });
            }
            cartService.updateCart(userId, newCart);
            const items = cartService.getCart(userId);
            const funkosItems = [];
            items.items.forEach(item => {
                const funko = funkoService.getFunko(item.id);
                funko.quantity = item.quantity;
                funkosItems.push(funko);
            });

            res.render('shop/cart', {
                funkos: funkosItems, user: user,
                userId: userId
            });
        }
    }

}



module.exports = shopControllers;




