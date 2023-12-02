
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
const checkboxesLicence = document.querySelectorAll('.checkbox-input-licence');

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

    checkboxesLicence.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Desmarcar todos los demás checkboxes
            checkboxesLicence.forEach(otherCheckbox => {
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
    const categorySelector = document.querySelector('input[name="categoria"]:checked');
    let category = '';
    if (categorySelector){
         category = categorySelector.id;
    }
    const licenceSelector = document.querySelector('input[name="licence"]:checked');
    let licence = '';
    if (licenceSelector){
         licence = licenceSelector.id;
    }

    const url = `/shop/apply-filters?minPrice=${minPrice}&maxPrice=${maxPrice}&ordenarPor=${ordenarPor}&buscar=${buscar}&category=${category? category : ''}&licence=${licence? licence : ''}`;

    window.location.href = url;
});

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });

    // Leer parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const minPriceParam = urlParams.get('minPrice');
    const maxPriceParam = urlParams.get('maxPrice');
    let ordenarPorParam = urlParams.get('ordenarPor');
    const buscarParam = urlParams.get('buscar');
    const categoryParam = urlParams.get('category');
    const licenceParam = urlParams.get('licence');
    
    if (!ordenarPorParam) {
        ordenarPorParam = 'az';
    }

    // Establecer valores en el formulario
    minPriceInput.value = minPriceParam || '';
    maxPriceInput.value = maxPriceParam || '';
    select.value = ordenarPorParam || '';
    btnBuscar.value = buscarParam || '';
    checkboxes.forEach(checkbox => {
        if (checkbox.id === categoryParam) {
            checkbox.checked = true;
        }
    });
    checkboxesLicence.forEach(checkbox => {
        if (checkbox.id === licenceParam) {
            checkbox.checked = true;
        }
    });
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