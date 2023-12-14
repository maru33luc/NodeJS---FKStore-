import * as cartLocalService from './cartLocalService.js';

const itemCart = document.querySelectorAll('.cart-item');
let subtotal = 0;
let total = 0;
const totalCart = document.getElementById('total-cart');
const totalItemsCart = document.getElementById('cant-items-cart');
const subtotalItems = document.getElementById('subtotal');
const cartBody = document.querySelector('body');
const user = cartBody.dataset.userId;

itemCart.forEach(item => {
    const btnAdd = item.querySelector('#add');
    const btnSub = item.querySelector('#substract');
    const quantity = item.querySelector('#quantity');
    const itemPrice = item.querySelector('#item-price');
    const btnDelete = item.querySelector('.cart-item-delete');

    btnAdd.addEventListener('click', (e) => {
        quantity.value++;
        total++;
        subtotal += parseFloat(itemPrice.innerHTML);
        totalCart.innerHTML ='$' + subtotal.toFixed(2);
        updateCart();
        // actualizar carrito servidor
        const id = e.target.dataset.itemId;
        const userId = e.target.dataset.userId;
        if (user) {
            const url = `/shop/add?idUser=${userId}&id=${id}&quantity=${quantity.value}`;
            window.location.href = url;
        }
    });

    btnSub.addEventListener('click', (e) => {
        if (quantity.value > 1) {
            quantity.value--;
            total--;
            subtotal -= parseFloat(itemPrice.innerHTML);
            totalCart.innerHTML = '$' +  subtotal.toFixed(2);
            updateCart();
            // actualizar carrito servidor
            const id = e.target.dataset.itemId;
            const userId = e.target.dataset.userId;
            if (user) {
                const url = `/shop/add?idUser=${userId}&id=${id}&quantity=${quantity.value}`;
                window.location.href = url;
            }
        }
    });

    btnDelete.addEventListener('click', (e) => {
        const user = cartBody.dataset.userId;
        if (user === '' || user === undefined) {
            //eliminar del carrito local
            const id = e.target.dataset.itemId;
            const quantity = e.target.dataset.itemQuantity;
            cartLocalService.deleteItemCart(id);
            //    tomar la url 
            const url = window.location.href;
            // eliminar el id de la url y la cantidad
            const urlArray = url.split('?');
            const urlArray2 = urlArray[1].split('&');

            const filteredArray = [];
            for (let i = 0; i < urlArray2.length; i++) {
                const currentItem = urlArray2[i];
                const [key, value] = currentItem.split('=');

                // Verificar si el elemento actual es 'id' y si el valor coincide con el id especificado
                if (key === 'id' && value === id) {
                    // Saltar el siguiente elemento ('quantity')
                    i++;
                } else {
                    // Agregar el elemento actual al nuevo array
                    filteredArray.push(currentItem);
                }
            }
            // unir el array en un string
            const urlFinalString = urlArray[0] + '?' + filteredArray.join('&');
            window.location.href = urlFinalString;
        } else {
            //eliminar del carrito servidor
            const id = e.target.dataset.itemId;
            const userId = e.target.dataset.userId;
            const url = `/shop/add?idUser=${userId}&id=${id}&quantity=0`;
            window.location.href = url;
        }
    });

    // Calcular subtotal para cada artículo
    const subtotalItem = parseInt(quantity.value) * parseFloat(itemPrice.innerHTML);
    subtotal += subtotalItem;
    total += parseInt(quantity.value);
    // totalCart.innerHTML = subtotal.toFixed(2);
    totalCart.innerHTML = '$' + subtotal.toFixed(2);
});

// Función para actualizar el resumen del carrito
function updateCart() {
    totalItemsCart.innerHTML = total;
    subtotalItems.innerHTML ='$' + subtotal.toFixed(2);
}

// Llama a la función para establecer los valores iniciales
updateCart();

if (itemCart.length === 0) {
    if (user === '' || user === undefined) {
        let url = `/shop/local?`;
        try {
            const res = await cartLocalService.getCartAll();
            res.forEach(item => {
                const id = item.itemId;
                const quantity = item.quantity;
                url += `id=${id}&quantity=${quantity}`;
                // si el indice es menor que el largo del array -1
                if (res.indexOf(item) < res.length - 1) {
                    url += '&';
                }
            });
            window.location.href = url;
        } catch (error) {
            console.log(error);
        }
    }
}

