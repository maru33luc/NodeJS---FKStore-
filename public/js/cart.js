
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

    btnAdd.addEventListener('click', (e) => {
        quantity.value++;
        total++;
        subtotal += parseFloat(itemPrice.innerHTML);
        totalCart.innerHTML = subtotal.toFixed(2);
        updateCart();
        // actualizar carrito servidor
        const id = e.target.dataset.itemId;
        const userId = e.target.dataset.userId;
        const url = `/shop/add?idUser=${userId}&id=${id}&quantity=${quantity.value}`;
        window.location.href = url;

    });

    btnSub.addEventListener('click', (e) => {
        if (quantity.value > 1) {
            quantity.value--;
            total--;
            subtotal -= parseFloat(itemPrice.innerHTML);
            totalCart.innerHTML = subtotal.toFixed(2);
            updateCart();
            // actualizar carrito servidor
            const id = e.target.dataset.itemId;
            const userId = e.target.dataset.userId;
            const url = `/shop/add?idUser=${userId}&id=${id}&quantity=${quantity.value}`;
            window.location.href = url;
        }

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

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Puedes cambiar a 'auto' si prefieres un desplazamiento instantáneo
    });
});
