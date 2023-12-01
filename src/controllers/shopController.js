const funkoService = require('../services/funkoServices');
const cartService = require('../services/cartServices');
const userServices = require('../services/userServices');

const shopControllers = {

    index: (req, res) => {
        const user = req.session.userLogged;
        const funkos = funkoService.getFunkos();
        const error = [];
        res.render('shop/shop', {
            funkos: funkos, user: user,
            error: error
        });
    },
    applyFilters: (req, res) => {
        const user = req.session.userLogged;
        const error = [];
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
        const ordenarPor = req.query.ordenarPor || 'asc';
        const licencia = req.query.licence || '';
        const categoria = req.query.category || '';

        // Obtén los Funkos desde el servicio
        const funkos = funkoService.getFunkos();

        // Filtra y ordena los Funkos según los parámetros
        const funkosFiltradosYOrdenados = funkoService.filtrarYOrdenarFunkos(funkos, minPrice, maxPrice, ordenarPor, licencia, categoria);

        // Devuelve los Funkos filtrados y ordenados como JSON
        res.render('shop/shop', {
            funkos: funkosFiltradosYOrdenados,
            user: user, error: error
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
                funkos: [], user: '',
                userId: null
            });
        }
    },
    localCart: (req, res) => {
        const funkosItems = [];
        const items = req.query;
        const funkos = funkoService.getFunkos();
        if (items.id === undefined) return res.render('shop/shop', {
            funkos: funkos, user: '',
            userId: null, error: 'No hay productos en el carrito'
        });

        for (let i = 0; i < items.id.length; i++) {
            const funko = funkoService.getFunko(items.id[i]);
            funko.quantity = items.quantity[i];
            funkosItems.push(funko);
        }
        res.render('shop/cart', {
            funkos: funkosItems, user: '',
            userId: null
        });
    },
    checkout: (req, res) => {
        res.send('Route for go to checkout page');
    },
    processCheckout: (req, res) => {
        res.send('Route for process the checkout');
    },
    addCart: (req, res) => {
        //agregar funkos desde vista carrito  usuarios logueados
        user = req.session.userLogged;
        let error = undefined;
        const userId = parseInt(req.query.idUser);
        const id = req.query.id;
        const funko = funkoService.getFunko(id);
        const quantity = req.query.quantity;
        const cart = cartService.getCart(userId);
        if (userId) {
            if (cart) {
                const item = cart.items.find(item => item.id == id);
                if (item) {
                    if (quantity === '0') {
                        cart.items = cart.items.filter(item => item.id !== id);
                    } else {
                        item.quantity = parseInt(quantity);
                    }
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
                    userId: userId, error: error, funko: funko
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
                res.render('shop/item', {
                    funkos: funkosItems, user: user,
                    userId: userId, error: error, funko: funko
                });
            }
        }

    },
    addItemCart: (req, res) => {
        // agrega funkos al carrito para usuarios logueados desde vista item
        user = req.session.userLogged;
        let error = undefined;
        const userId = parseInt(req.query.idUser);
        const id = req.query.id;
        const funko = funkoService.getFunko(id);
        const quantity = req.query.quantity;
        const cart = cartService.getCart(userId);
        if (cart) {
            const item = cart.items.find(item => item.id == id);
            if (item) {
                if (quantity === '0') {
                    cart.items = cart.items.filter(item => item.id !== id);
                } else {
                    error = 'El producto ya se encuentra en el carrito';
                }
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
            res.render('shop/item', {
                funkos: funkosItems, user: user,
                userId: userId, error: error, funko: funko
            });
        } else {
            const newCart = cartService.createCart(userId);
            newCart.items.push({ id: id, quantity: parseInt(quantity) });
            cartService.updateCart(userId, newCart);
            const items = cartService.getCart(userId);
            const funkosItems = [];
            items.items.forEach(item => {
                const funko = funkoService.getFunko(item.id);
                funko.quantity = item.quantity;
                funkosItems.push(funko);
            });
            res.render('shop/item', {
                funkos: funkosItems, user: user,
                userId: userId, error: error, funko: funko
            });
        }
    }
}

module.exports = shopControllers;




