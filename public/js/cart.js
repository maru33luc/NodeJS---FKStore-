
const itemCart = document.querySelectorAll('.cart-item');
let subtotal = 0;
let total = 0;
const totalCart = document.getElementById('total-cart');
const totalItemsCart = document.getElementById('cant-items-cart');
const subtotalItems = document.getElementById('subtotal');

itemCart.forEach(item => {
    const btnAdd = item.querySelector('#add');
    const btnSub = item.querySelector('#substract');
    const quantity = item.querySelector('#quantity');
    const itemPrice = item.querySelector('#item-price');

    btnAdd.addEventListener('click', () => {
        quantity.value++;
        total++;
        subtotal += parseFloat(itemPrice.innerHTML);
        totalCart.innerHTML = subtotal.toFixed(2);
        updateCart();
        // // actualizar carrito en el servidor
        // let cart = getCart();
        // let item = cart.items.find(item => item.id === parseInt(itemPrice.dataset.id));
        // if(item) {
        //     item.quantity++;
        // }
        // updateCarrito(cart);


    });

    btnSub.addEventListener('click', () => {
        if (quantity.value > 1) {
            quantity.value--;
            total--;
            subtotal -= parseFloat(itemPrice.innerHTML);
            totalCart.innerHTML = subtotal.toFixed(2);
            updateCart();
        }
        // // actualizar carrito en el servidor
        // let cart = getCart();
        // let item = cart.items.find(item => item.id === parseInt(itemPrice.dataset.id));
        // if(item) {
        //     item.quantity--;
        // }
        // updateCarrito(cart);
        
    });

    // Calcular subtotal para cada artículo
    const subtotalItem = parseInt(quantity.value) * parseFloat(itemPrice.innerHTML);
    subtotal += subtotalItem;
    total += parseInt(quantity.value);
    totalCart.innerHTML = subtotal.toFixed(2);
});




// Función para actualizar el resumen del carrito
function updateCart() {
    
    totalItemsCart.innerHTML = total;
    subtotalItems.innerHTML = subtotal.toFixed(2);
}

// Llama a la función para establecer los valores iniciales
updateCart();