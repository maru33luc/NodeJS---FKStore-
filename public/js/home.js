const btnStarWars = document.querySelector('#btn-collection-star-wars');
const btnHarryPotter = document.querySelector('#btn-collection-harry-potter');
const btnPokemon = document.querySelector('#btn-collection-pokemon');

btnStarWars.addEventListener('click', () => {
    const url = `/shop/apply-filters?licence=Star Wars`;
    window.location.href = url;
});

btnHarryPotter.addEventListener('click', () => {
    const url = `/shop/apply-filters?licence=Harry Potter`;
    window.location.href = url;
});

btnPokemon.addEventListener('click', () => {
    const url = `/shop/apply-filters?licence=Pokemon`;
    window.location.href = url;
});

