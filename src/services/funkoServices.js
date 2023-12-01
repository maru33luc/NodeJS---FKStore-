const fs = require('fs');
const path = require('path');

const funkosFilePath = path.join(__dirname, '../../data/db.js');
const funkos = JSON.parse(fs.readFileSync(funkosFilePath, 'utf-8'));

module.exports = {
    getFunkos: () => {
        return funkos;
    },
    getFunko: (id) => {
        return funkos.find(funko => funko.product_id == id);
    },
    createFunko: (funko) => {
        funkos.push(funko);
        fs.writeFileSync(funkosFilePath, JSON.stringify(funkos, null, 2));
        return funko;
    },
    updateFunko: (id, funko) => {
        const funkoIndex = funkos.findIndex(funko => funko.product_id == id);
        funkos[funkoIndex] = funko;
        fs.writeFileSync(funkosFilePath, JSON.stringify(funkos, null, 2));
        return funko;
    },
    deleteFunko: (id) => {
        const funkoIndex = funkos.findIndex(funko => funko.product_id == id);
        funkos.splice(funkoIndex, 1);
        fs.writeFileSync(funkosFilePath, JSON.stringify(funkos, null, 2));
    },
    getFunkosByLicence: (licence) => {
        return funkos.filter(funko => funko.licence_name == licence);
    },
    getFunkosByCategory: (category) => {
        return funkos.filter(funko => funko.category_name == category);
    },
    getFunkosByLicenceAndCategory: (licence, category) => {
        return funkos.filter(funko => funko.licence_name == licence && funko.category_name == category);
    },
    getFunkosByName: (name) => {
        return funkos.filter(funko => funko.product_name.toLowerCase().includes(name.toLowerCase()));
    },
    ordenarFunkosByPriceAsc: () => {
        return funkos.sort((a, b) => a.product_price - b.product_price);
    },
    ordenarFunkosByPriceDesc: () => {
        return funkos.sort((a, b) => b.product_price - a.product_price);
    },
    ordenarFunkosByNameAsc: () => {
        return funkos.sort((a, b) => {
            if (a.product_name < b.product_name) {
                return -1;
            }
            if (a.product_name > b.product_name) {
                return 1;
            }
            return 0;
        });
    },
    ordenarFunkosByNameDesc: () => {
        return funkos.sort((a, b) => {
            if (a.product_name > b.product_name) {
                return -1;
            }
            if (a.product_name < b.product_name) {
                return 1;
            }
            return 0;
        });
    },
    filtrarYOrdenarFunkos: (funkos, minPrice, maxPrice, ordenarPor, licence, category) => {
        let funkosFiltrados = funkos;
        if(category != ''){
            funkosFiltrados = funkosFiltrados.filter (funko => funko.category_name==category);
        }
        if( licence != ''){
            funkosFiltrados = funkosFiltrados.filter (funko => funko.licence_name==licence);
        }
        if(minPrice != ''){
            funkosFiltrados = funkosFiltrados.filter (funko => funko.product_price>=minPrice);
        }
        if(maxPrice != ''){
            funkosFiltrados = funkosFiltrados.filter (funko => funko.product_price<=maxPrice);
        }
        // Ordena según la opción seleccionada
        switch (ordenarPor) {
            case 'asc':
                return funkosFiltrados.sort((a, b) => a.product_price - b.product_price);
            case 'desc':
                return funkosFiltrados.sort((a, b) => b.product_price - a.product_price);
            case 'az':
                return funkosFiltrados.sort((a, b) => a.product_name.localeCompare(b.product_name));
            case 'za':
                return funkosFiltrados.sort((a, b) => b.product_name.localeCompare(a.product_name));
            default:
                return funkosFiltrados;
        }
    }
}
