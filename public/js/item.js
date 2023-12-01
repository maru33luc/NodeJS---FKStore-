import * as cartLocalService from './cartLocalService.js';

const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');

if ( quantity.value == '' || quantity.value == null) {
    quantity.value = 0;
}

add.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
});

substract.addEventListener('click', () => {
    if(quantity.value > 0){
        quantity.value = parseInt(quantity.value) - 1;
    }
});

const btnAddCart = document.querySelector('#btn-add-Cart');

btnAddCart.addEventListener('click', async (e) => {
    if(e.target.dataset.userId == null || e.target.dataset.userId == ''){
       const id = e.target.dataset.itemId;
       const item = await cartLocalService.getCart(id);
       if(item && id && quantity.value > 0){
        cartLocalService.updateCart(id, quantity.value);
           window.location.href = `/shop/item/${id}`;
         }
         else{
            if(id && quantity.value > 0){
              cartLocalService.addCart(id, quantity.value);
                window.location.href = `/shop/item/${id}`;
            }   
        }
    }else{
        const id = e.target.dataset.itemId;
    const userId = e.target.dataset.userId;
    const url = `/shop/addItem?idUser=${userId}&id=${id}&quantity=${quantity.value}`;
    window.location.href = url;  
    }
    
});



