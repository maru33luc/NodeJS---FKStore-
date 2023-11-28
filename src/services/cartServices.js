const fs = require('fs');
const path = require('path');

const cartFilePath = path.join(__dirname, '../../data/carts.js');
const carts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));

module.exports = {
    createCart : (userId) => {
        const cart = {
            userId: userId,
            items: []
        }
    },
    updateCart : (id, newCart) => {
        const index = carts.findIndex(cart => cart.userId === id);
        carts[index] = newCart;
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, ' '));
    },
    getCart : (id) => {
        return carts.find(cart => cart.userId === id);
    },
    deleteCart : (id) => {
        const index = carts.findIndex(cart => cart.userId === id);
        carts.splice(index, 1);
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, ' '));
    }


}
