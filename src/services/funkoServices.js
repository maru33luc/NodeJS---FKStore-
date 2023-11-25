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
    getFunkosByName : (name) => {
        return funkos.filter(funko => funko.product_name.toLowerCase().includes(name.toLowerCase()));
    }


}
