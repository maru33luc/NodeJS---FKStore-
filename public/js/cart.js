const itemCart = document.querySelectorAll('.cart-item');
let subtotal = 0;

itemCart.forEach(item => {
    const btnAdd = item.querySelector('#add');
    const btnSub = item.querySelector('#substract');
    const quantity = item.querySelector('#quantity');
    const itemPrice = item.querySelector('#item-price');

    btnAdd.addEventListener('click', () => {
        quantity.value++;
    });

    btnSub.addEventListener('click', () => {
        quantity.value--;
    });

    const subtotalItem = parseInt(quantity.value) * parseFloat(itemPrice.innerHTML);
    console.log(subtotalItem, typeof subtotalItem);
    subtotal += subtotalItem;
});

const totalItemsCart = document.getElementById('cant-items-cart');
const subtotalItems = document.getElementById('subtotal');


const items = document.querySelectorAll('.item-cart-quantity');
let total = 0;

items.forEach(item => {
    const quantity = item.querySelector('#quantity');
    total += parseInt(quantity.value);
});

totalItemsCart.innerHTML = total;
subtotalItems.innerHTML = subtotal.toFixed(2);


