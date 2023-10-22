const shopControllers = {
    index: (req, res) => {
        res.send('Route for get all products');
    },
    detail: (req, res) => {
        res.send('Route for get a product from an id');
    },
    cart: (req, res) => {
        res.send('Route for the cart view');
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




