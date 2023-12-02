
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

const checkboxes = document.querySelectorAll('.checkbox-input');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Desmarcar todos los demás checkboxes
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        });
    });

const select = document.getElementById('shop__aside-select');
const btnAplicarFiltro = document.getElementById('btn-aplicar-filtro');
const btnBuscar = document.getElementById('buscar');

btnAplicarFiltro.addEventListener('click', function () {
    const minPrice = minPriceInput.value;
    const maxPrice = maxPriceInput.value;
    const ordenarPor = select.value;
    const buscar = btnBuscar.value;
    const categorySelector = document.querySelector('input[name="licence"]:checked');
    let category = '';
    if (categorySelector){
         category = categorySelector.id;
    }

    const url = `/shop/apply-filters?minPrice=${minPrice}&maxPrice=${maxPrice}&ordenarPor=${ordenarPor}&buscar=${buscar}&category=${category? category : ''}`;

    window.location.href = url;
});


document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Puedes cambiar a 'auto' si prefieres un desplazamiento instantáneo
    });
    // Función para obtener parámetros de la URL
    // function getParameterByName(name, url) {
    //     if (!url) url = window.location.href;
    //     name = name.replace(/[\[\]]/g, '\\$&');
    //     const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    //         results = regex.exec(url);
    //     if (!results) {
            
    //         return null;
    //     }
    //     if (!results[2]) return '';
    //     return decodeURIComponent(results[2].replace(/\+/g, ' '));
    // }

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const minPriceParam = urlParams.get('minPrice');
    const maxPriceParam = urlParams.get('maxPrice');
    let ordenarPorParam = urlParams.get('ordenarPor');
    const buscarParam = urlParams.get('buscar');
    
    if (!ordenarPorParam) {
        ordenarPorParam = 'az';
    }

    // Establecer valores en el formulario
    minPriceInput.value = minPriceParam || '';
    maxPriceInput.value = maxPriceParam || '';
    select.value = ordenarPorParam || '';
    btnBuscar.value = buscarParam || '';
});



// --------------Pagination----------------
const itemsPerPage = 9;
const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');

const allItems = document.querySelectorAll('.card-item');
const totalItems = allItems.length;

let currentPage = 0;

const paginationList = document.querySelector('.pag__ul');

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
}

function goToPage(pageNumber) {
    if (pageNumber < 0) {
        currentPage = 0;
    } else if (pageNumber >= Math.ceil(totalItems / itemsPerPage)) {
        currentPage = Math.ceil(totalItems / itemsPerPage) - 1;
    } else {
        currentPage = pageNumber;
    }

    showPage(currentPage);

     // Remover la clase 'active' de todos los enlaces de página
     const dynamicPageLinks = document.querySelectorAll('.page-link');
     dynamicPageLinks.forEach(link => {
         link.classList.remove('active');
     });
 
     // Agregar la clase 'active' al enlace de la página actual
     dynamicPageLinks[currentPage].classList.add('active');

     window.scrollTo({
        top: 0,
        behavior: 'smooth' // Puedes cambiar a 'auto' si prefieres un desplazamiento instantáneo
    });


}

showPage(currentPage);

previousPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage - 1);
});

nextPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage + 1);
});

const totalPages = Math.ceil(totalItems / itemsPerPage);

// Generar dinámicamente los enlaces de paginación
for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('li');
    pageLink.classList.add('page-link');
    pageLink.innerHTML = `<a href="#">${i}</a>`;
    paginationList.insertBefore(pageLink, nextPage);
}

// Agregar evento clic a los enlaces de página generados dinámicamente
const dynamicPageLinks = document.querySelectorAll('.page-link');
dynamicPageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(index);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if(dynamicPageLinks.length > 0){
        dynamicPageLinks[0].classList.add('active');
    }
}
);