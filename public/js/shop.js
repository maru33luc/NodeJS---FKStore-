
// -----------------VALIDAR ENTRADAS RANGO PRECIOS-----------------

const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

minPriceInput.addEventListener('change', function () {
    validarYFormatearPrecios(minPriceInput);
});
maxPriceInput.addEventListener('change', function () {
    validarYFormatearPrecios(maxPriceInput);
});

function validarYFormatearPrecios(input) {
    if (isNaN(input.value)) {
        alert('Por favor, ingrese valores numéricos válidos para los precios.');
        return;
    }
    if (input.value < 0) {
        alert('Por favor, ingrese valores numéricos positivos para los precios.');
        return;
    }
    const minPriceValue = parseFloat(input.value);
    const minPriceFormatted = minPriceValue.toFixed(2);
    input.value = minPriceFormatted;
}

// -----------------FILTRADOS-------------------------

const select = document.getElementById('shop__aside-select');
const btnAplicarFiltro = document.getElementById('btn-aplicar-filtro');

btnAplicarFiltro.addEventListener('click', function () {
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    const ordenarPor = select.value;

    const url = `/shop/apply-filters?minPrice=${minPrice}&maxPrice=${maxPrice}&ordenarPor=${ordenarPor}`;

    window.location.href = url;
});


document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Puedes cambiar a 'auto' si prefieres un desplazamiento instantáneo
    });
    // Función para obtener parámetros de la URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) {
            
            return null;
        }
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const minPriceParam = urlParams.get('minPrice');
    const maxPriceParam = urlParams.get('maxPrice');
    let ordenarPorParam = urlParams.get('ordenarPor');
    
    if (!ordenarPorParam) {
        ordenarPorParam = 'az';
    }

    // Establecer valores en el formulario
    minPriceInput.value = minPriceParam || '';
    maxPriceInput.value = maxPriceParam || '';
    select.value = ordenarPorParam || '';
});

const btnLimpiarFiltro = document.getElementById('btn-limpiar-filtro');

btnLimpiarFiltro.addEventListener('click', function () {
    window.location.href = '/shop';
});


// --------------Pagination----------------

const itemsPerPage = 9;
const pageLinks = document.querySelectorAll('.page-link');
const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');

const allItems = document.querySelectorAll('.card-item');
const totalItems = allItems.length;

let currentPage = 0;


function showPage(pageNumber) {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    allItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.position = 'relative';
            item.style.display = 'block';
        } else {
            item.style.position = 'relative';
            item.style.display = 'none';
        }
    });

    pageLinks.forEach((link, index) => {
        if (index === pageNumber) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

}

function goToPage(pageNumber) {
    if (pageNumber < 0) {
        currentPage = 0; // No puede ser menor que 0
    } else if (pageNumber >= Math.ceil(totalItems / itemsPerPage)) {
        currentPage = Math.ceil(totalItems / itemsPerPage) - 1; // No puede ser mayor que el último índice de página
    } else {
        currentPage = pageNumber;
    }

    showPage(currentPage);

}

showPage(currentPage);

pageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(index);

    });
});

previousPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage - 1);
});

nextPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage + 1);
});
