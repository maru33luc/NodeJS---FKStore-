const itemCart = document.querySelectorAll('.item-cart-quantity');

itemCart.forEach(item => {
    const btnAdd = item.querySelector('#add');
    const btnSub = item.querySelector('#substract');
    const quantity = item.querySelector('#quantity');

    btnAdd.addEventListener('click', () => {
        quantity.value++;
    });

    btnSub.addEventListener('click', () => {
        quantity.value--;
    });
});


