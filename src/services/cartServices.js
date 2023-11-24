const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../data/cart.js');

module.exports = {
    createCart : (userId) => {
        const cart = {
            userId: userId,
            items: []
        }
    },
    updateCart : (id, newCart) => {
        const index = carts.findIndex(cart => cart.id === id);
        carts[index] = newCart;
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, ' '));
    },
    getCart : (id) => {
        return carts.find(cart => cart.id === id);
    },
    deleteCart : (id) => {
        const index = carts.findIndex(cart => cart.id === id);
        carts.splice(index, 1);
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, ' '));
    }


}
