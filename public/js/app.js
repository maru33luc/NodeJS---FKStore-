const menu = document.querySelector(".navbar__menu")

const iconoHamb = document.querySelector(".menu-icon")

iconoHamb.addEventListener("click", () => {
    menu.classList.toggle("navbar__menu")
    menu.classList.toggle("navbar__menu-toogle")
})

const btnFunkoPop = document.querySelector('#btn-category-funko-pop');
const btnKeychain = document.querySelector('#btn-category-keychain');
const btnMinis = document.querySelector('#btn-category-minis');

btnFunkoPop.addEventListener('click', () => {
    console.log('hola');
    const url = `/shop/apply-filters?category=Funko Pop!`;
    window.location.href = url;
});

btnKeychain.addEventListener('click', () => {
    const url = `/shop/apply-filters?category=Keychain`;
    window.location.href = url;
});

btnMinis.addEventListener('click', () => {
    const url = `/shop/apply-filters?category=Minis`;
    window.location.href = url;
});
